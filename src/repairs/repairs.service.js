import Repair from "./repairs.model.js";
import { Op } from "sequelize";
import user from "../users/users.model.js";

export class RepairService {
  async findAllRepairs() {
    return await Repair.findAll({
      where: {
        status: { [Op.like]: { [Op.any]: ["completed%", "pending"] } },
      },
      attributes: { exclude: ["userid", "user_id"] },
      include: [
        {
          model: user,
          as: "repairUser",
          attributes: ["name", "email"],
        },
      ],
    });
  }

  async findOneRepair(id) {
    return await Repair.findOne({
      where: {
        id,
        status: { [Op.like]: { [Op.any]: ["completed%", "pending"] } },
      },
      attributes: { exclude: ["userid", "user_id"] },
      include: [
        {
          model: user,
          as: "repairUser",
          attributes: ["name", "email"],
        },
      ],
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
