import Repair from "./repairs.model.js";

export class RepairService {
  async findAllRepairs() {
    return await Repair.findAll({
      where: {
        status: "pending",
      },
    });
  }

  async findOneRepair(id) {
    return await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });
  }

  async createRepair(data) {
    return await Repair.create(data);
  }

  async updateRepair(repair, data) {
    return await repair.update({ status: "completed" });
  }

  async deleteRepair(repair, who) {
    return await repair.update({ status: `cancelled by ${who} ` });
  }
}
