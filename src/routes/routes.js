import { Router } from "express";
import { router as usersRouter } from "../users/users.route.js";
import { router as repairsRouter } from "../repairs/repairs.route.js";

export const router = Router();
// lo que coloque aca se va a concatenar con /api/v1
router.use("/users", usersRouter);
router.use("/repairs", repairsRouter);
