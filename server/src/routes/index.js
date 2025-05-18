import eventRoutes from "./api/events.js";
import tagRoutes from "./api/tags.js";
import userRoutes from "./api/users.js";
import accountRoutes from "./api/accounts.js";
import express from "express";

import { authenticateMiddleware } from "../utils/auth.js";

const router = express.Router();

router.use("/api/events", authenticateMiddleware, eventRoutes);
router.use("/api/tags", authenticateMiddleware, tagRoutes);
router.use("/api/users", authenticateMiddleware, userRoutes);
router.use("/api/accounts", accountRoutes); // accouts/me is protected from within the /accounts file

export default router;
