import { Router } from "express";
import { connectToDatabase } from "../../db/connection";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "username or password is undefined." });
  }

  const db = await connectToDatabase();
});

export default router;
