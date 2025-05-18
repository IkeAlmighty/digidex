import { Router } from "express";
import { User } from "../../models/index.js";
import jwt from "jsonwebtoken";
import { authenticateMiddleware } from "../../utils/auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "email or password is undefined." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist." });
    }

    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      return res.status(401).json({ message: "Authentication failed." });
    }

    const { id } = user;

    // create token:
    const authToken = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // create an httpOnly cookie to store user data
    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days to match jwt token expiration
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

router.post("/logout", async (_req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.redirect("/login");
});

router.get("/me", authenticateMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("tags")
    .select("-password");
  res.json(user);
});

export default router;
