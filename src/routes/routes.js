import { Router } from "express";
import { router as repairsRouter } from "../repairs/repairs.route.js";
import { router as authRouter } from "../users/users.route.js";

export const router = Router();
// lo que coloque aca se va a concatenar con /api/v1
router.use("/repairs", repairsRouter);
router.use("/users", authRouter);
