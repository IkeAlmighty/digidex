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
        req.user = decoded; // Attach the decoded user data to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized" });
    }
};

const authorizeUser = () => async (req, res, next) => {
    if (!req.user) {
        // TODO: redirect to login:
    }

    // grab the subscriptions for the user: FIXME: use projection to only get subscriptions
    const db = await connectToDatabase();
    const userData = await db
        .collection("users")
        .findOne({ _id: req.user._id });
    const { subscriptions } = userData;

    // determine whether the current user logged in
    // has access to the url being hit up in this request

    // users are authorized to access tag urls that they are subscribed to
    // and they are authorized to access event urls that contain tags in their
    // subscription list:

    next();
};

export default authenticate;
