import { Router } from "express";
import {
  findAllUsers,
  createUser,
  findOneUser,
  updateUser,
  deleteUser,
} from "./users.controller.js";

import { validateExistUser } from "./users.middleware.js";

export const router = Router();

router.route("/").get(findAllUsers).post(createUser);

router
  .route("/:id")
  .get(validateExistUser, findOneUser)
  .patch(validateExistUser, updateUser)
  .delete(validateExistUser, deleteUser);
