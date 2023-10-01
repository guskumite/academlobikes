import { RepairService } from "./repairs.service.js";

const repairService = new RepairService();

export const validateExistRepair = async (req, res, next) => {
  const { id } = req.params;

  const repair = await repairService.findOneRepair(id);

  if (!repair) {
    return res.status(404).json({
      status: "error",
      message: `Repair order not found with id: ${id}`,
    });
  }

  req.repair = repair;
  next();
};
