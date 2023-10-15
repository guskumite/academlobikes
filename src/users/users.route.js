import express from "express";
import {
  login,
  register,
  changePassword,
  findAllUsers,
  findOneUser,
  deleteUser,
} from "./users.controller.js";
import { protect, restrictTo } from "./users.middleware.js";
import { userValidationRules, validate } from "../errors/validator.js";

export const router = express.Router();

router.post("/login", login);

router.post(
  "/register",
  userValidationRules(),
  validate,
  protect,
  restrictTo("developer"),
  register
);

// for initial superuser creation
//router.post("/register", register);

router.patch("/change-password", protect, changePassword);
router.get("/", protect, findAllUsers);
router.route("/:id").get(protect, restrictTo("developer"), findOneUser);
router.route("/:id").delete(protect, restrictTo("developer"), deleteUser);
