import { Router } from "express";
import {
  findAllRepairs,
  createRepair,
  findOneRepair,
  updateRepair,
  deleteRepair,
} from "./repairs.controller.js";

import { validateExistRepair } from "./repairs.middleware.js";
import { protect, restrictTo } from "../users/users.middleware.js";

export const router = Router();

router
  .route("/")
  .get(protect, restrictTo("employee"), findAllRepairs)
  .post(protect, restrictTo("employee"), createRepair);

router
  .route("/:id")
  .get(
    protect,
    restrictTo("employee"),
    validateExistRepair,
    protect,
    restrictTo("employee"),
    findOneRepair
  )
  .patch(
    protect,
    restrictTo("employee"),
    validateExistRepair,
    protect,
    restrictTo("employee"),
    updateRepair
  )
  .delete(
    protect,
    restrictTo("employee"),
    validateExistRepair,
    protect,
    restrictTo("employee"),
    deleteRepair
  );
