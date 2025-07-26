import { authenticateMiddleware } from "../utils/auth.js";
import userRoutes from "./api/users.js";
import contactRoutes from "./api/contacts.js";
import express from "express";

const router = express.Router();

router.use("/api/users", userRoutes); // accouts/me is protected from within the /accounts file
router.use("/api/contacts", authenticateMiddleware, contactRoutes);

export default router;
