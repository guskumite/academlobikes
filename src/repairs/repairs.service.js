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

  async updateRepair(repair, who) {
    return await repair.update({ status: `completed by ${who}` });
  }

  async deleteRepair(repair, who) {
    return await repair.update({ status: `cancelled by ${who} ` });
  }
}
