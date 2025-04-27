// import jwt from "jsonwebtoken";
import { connectToDatabase } from "../db/connection.js";

// Middleware function to authenticate the user
const authenticate = (req, res, next) => {
  const token = req.header("Authorization"); // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    // Determine whether the user has the permissions required to access the
    // current url, and throw an unauthorized error if they do not:
    // TODO
    const { user } = decoded;
    const path = req.url;
    // Attach the decoded user data to the request object
    if (user.permissions.includes(path)) req.user = decoded;
    else throw new Error("Unauthorized");

    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export default authenticate;
