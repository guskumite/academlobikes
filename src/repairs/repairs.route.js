import { Router } from "express";
import {
  findAllRepairs,
  createRepair,
  findOneRepair,
  updateRepair,
  deleteRepair,
} from "./repairs.controller.js";

import { validateExistRepair } from "./repairs.middleware.js";

export const router = Router();

router.route("/").get(findAllRepairs).post(createRepair);

router
  .route("/:id")
  .get(validateExistRepair, findOneRepair)
  .patch(validateExistRepair, updateRepair)
  .delete(validateExistRepair, deleteRepair);
