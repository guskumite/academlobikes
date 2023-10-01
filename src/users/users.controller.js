import { validateUser, validatePartialUser } from "./users.schema.js";
import { UserService } from "./users.service.js";

const userService = new UserService();

export const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneUser = async (req, res) => {
  try {
    const { user } = req;

    if (user.dataValues.status !== "available") {
      let myError = `The id ${user.dataValues.id} does not exist on db, therefore, it cannot be shown`;
      return res.status(500).json(myError);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { hasError, errorMessages, userData } = validateUser(req.body);

    if (hasError) {
      return res.status(422).json({
        status: "error",
        messages: errorMessages,
      });
    }

    const user = await userService.createUser(userData);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await userService.deleteUser(user);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { user } = req;

    const { hasError, errorMessages, dataUser } = validatePartialUser(req.body);

    if (hasError) {
      return res.status(422).json({
        status: "error",
        message: errorMessages,
      });
    }

    const userUpdated = await userService.updateUser(user, dataUser);

    return res.status(200).json(userUpdated);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
