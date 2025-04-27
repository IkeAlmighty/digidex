import jwt from "jsonwebtoken";

// Middleware function to authenticate the user
const authenticateMiddleware = (req, res, next) => {
  const token = req.cookies.authToken; // Get token from httpOnly cookie

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    // Attach the decoded user data to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.log(err);
    // send user to login page if the token is invalid
    return res.redirect("/login");
  }
};

export { authenticateMiddleware };
