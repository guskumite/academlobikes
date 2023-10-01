import Repair from "./repairs.model.js";

export class RepairService {
  async findAllRepairs() {
    return await Repair.findAll();
  }

  async findOneRepair(id) {
    return await Repair.findOne({
      where: {
        id,
      },
    });
  }

  async createRepair(data) {
    return await Repair.create(data);
  }

  async updateRepair(repair, data) {
    return await repair.update({ status: "completed" });
  }

  async deleteRepair(repair) {
    return await repair.update({ status: "cancelled" });
  }
}
