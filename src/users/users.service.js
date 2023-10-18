import User from "./users.model.js";

export class AuthService {
  async findAllUsers() {
    return await User.findAll({ where: { status: "available" } });
  }

  async findOneUserById(id) {
    return await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
  }

  async findOneUserByEmail(email) {
    return await User.findOne({
      where: {
        email,
        status: "available",
      },
    });
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

  async updateUser(user, name, email) {
    return await user.update({ name: name, email: email });
  }

  async deleteUser(user) {
    return await user.update({ status: "inactive" });
  }
}
