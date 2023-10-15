import { validateRepair } from "./repairs.schema.js";
import { RepairService } from "./repairs.service.js";

const repairService = new RepairService();

export const findAllRepairs = async (req, res) => {
  try {
    const repairs = await repairService.findAllRepairs();

    return res.status(200).json(repairs);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneRepair = async (req, res) => {
  try {
    const { repair } = req;
    if (repair.dataValues.status !== "pending") {
      let myError = `The id ${repair.dataValues.id} is not in pending status`;
      return res.status(500).json(myError);
    }

    return res.status(200).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createRepair = async (req, res) => {
  try {
    req.body.userid = req.sessionUser.id;
    const { hasError, errorMessages, repairData } = validateRepair(req.body);

    if (hasError) {
      return res.status(422).json({
        status: "error",
        messages: errorMessages,
      });
    }

    if (typeof req.body.status !== "string") {
      return res.status(422).json({
        status: "error: status must be a string",
        messages: errorMessages,
      });
    }

    if (typeof req.body.userid !== "number") {
      return res.status(422).json({
        status: "error: userid must be a number",
        messages: errorMessages,
      });
    }

    const repair = await repairService.createRepair(req.body);
    return res.status(201).json(repair);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteRepair = async (req, res) => {
  try {
    const { repair } = req;

    if (repair.dataValues.status !== "pending") {
      let myError = `The id ${repair.dataValues.id} is not in pending status, therefore, it cannot be deleted`;
      return res.status(500).json(myError);
    }

    await repairService.deleteRepair(repair, req.sessionUser.id);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateRepair = async (req, res) => {
  try {
    const { repair } = req;
    if (repair.dataValues.status !== "pending") {
      let myError = `The id ${repair.dataValues.id} is not in pending status, therefore it can not be updated`;
      return res.status(500).json(myError);
    }

    await repairService.updateRepair(repair, req.sessionUser.id);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};
