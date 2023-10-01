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
    /* const { hasError, errorMessages, repairData } = validateRepair(req.body); */

    /* it is pending to validate how to correctly code the date to be validated */
    /* no supe como validar el campo de fecha */

    const hasError = false;
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

    await repairService.deleteRepair(repair);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateRepair = async (req, res) => {
  try {
    const { repair } = req;

    if (repair.dataValues.status !== "pending") {
      let myError = `The id ${repair.dataValues.id} is not in pending status, therefore, it cannot be updated`;
      return res.status(500).json(myError);
    }

    const { hasError, errorMessages, dataRepair } = validateRepair(req.body);

    if (hasError) {
      return res.status(422).json({
        status: "error",
        message: errorMessages,
      });
    }

    const repairUpdated = await repairService.updateRepair(repair, dataRepair);

    return res.status(200).json(repairUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};
