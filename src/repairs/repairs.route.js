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
import { repairValidationRules, validate } from "../errors/validator.js";

export const router = Router();

router
  .route("/")
  .get(protect, restrictTo("employee"), findAllRepairs)
  .post(
    repairValidationRules(),
    validate,
    protect,
    restrictTo("employee"),
    createRepair
  );

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
  .patch(validateExistRepair, protect, restrictTo("employee"), updateRepair)
  .delete(
    protect,
    restrictTo("employee"),
    validateExistRepair,
    protect,
    restrictTo("employee"),
    deleteRepair
  );
