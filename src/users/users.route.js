import express from "express";
import {
  login,
  register,
  changePassword,
  findAllUsers,
  findOneUser,
  deleteUser,
  deletemyUser,
  updatemyUser,
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
router.delete(
  "/delete-user",
  protect,
  restrictTo("developer", "manager"),
  deleteUser
);
router.get("/", protect, restrictTo("developer", "manager"), findAllUsers);
router
  .route("/:id")
  .get(
    protect,
    restrictTo("developer", "receptionist", "admin", "manager", "employee"),
    findOneUser
  )
  .patch(
    protect,
    restrictTo("developer", "receptionist", "admin", "manager", "employee"),
    updatemyUser
  )
  .delete(
    protect,
    restrictTo("developer", "receptionist", "admin", "manager", "employee"),
    deletemyUser
  );

/*  .delete(protect, restrictTo("developer", "manager"), deleteUser) */
/* router.route("/:id").patch(updatemyUser).delete(deletemyUser); */
