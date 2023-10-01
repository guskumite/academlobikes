import User from "./users.model.js";

export class UserService {
  async findAllUsers() {
    return await User.findAll({ where: { status: "available" } });
  }

  async findOneUser(id) {
    return await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
  }

  async createUser(data) {
    return await User.create(data);
  }

  async updateUser(user, data) {
    return await user.update(data);
  }

  async deleteUser(user) {
    return await user.update({ status: "inactive" });
  }
}
