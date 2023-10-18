import {
  encryptedPassword,
  verifyPassword,
} from "../config/plugins/encripted-password-plugin.js";
import generateJWT from "../config/plugins/generate-jwt-plugin.js";

import { validateLogin, validateRegister } from "./users.schema.js";
import { AuthService } from "./users.service.js";
import { AppError, catchAsync } from "../errors/index.js";

const authService = new AuthService();

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  //1. validar que el usuario exista en base de datos
  const user = await authService.findOneUserByEmail(userData.email);

  if (!user) {
    return next(new AppError("This account does not exist", 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  //2 validar si la contraseña es correcta
  if (!isCorrectPassword) {
    return next(new AppError("Incorrect email or password", 401));
  }
  //3 generar el token
  const token = await generateJWT(user.id);
  //4. enviar la respuesta al cliente
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateRegister(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const user = await authService.createUser(userData);

  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const changePassword = catchAsync(async (req, res, next) => {
  //1. traerme el usuario
  const { sessionUser } = req;

  //2. traerme los datos de la req.body
  const { currentPassword, newPassword } = req.body;

  //3. validar si la contraseña actual y la nueva son iguales, si es asi enviar un error
  if (currentPassword === newPassword) {
    return next(new AppError("The passwords cannot be equal", 400));
  }

  //4. validar si la contraseña actual es igual a la contraseña en base de datos
  const isCorrectPassword = await verifyPassword(
    currentPassword,
    sessionUser.password
  );

  if (!isCorrectPassword) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //5. encriptar la nueva contraseña
  const hashedNewPassword = await encryptedPassword(newPassword);

  await authService.updateUser(sessionUser, {
    password: hashedNewPassword,
    changedPasswordAt: new Date(),
  });

  return res.status(200).json({
    message: "The user password has been updated successfully",
  });
});

export const findAllUsers = async (req, res) => {
  try {
    const users = await authService.findAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await authService.findOneUserById(id);

    if (user.dataValues.status !== "available") {
      let myError = `The id ${user.dataValues.id} does not exist on db, therefore, it cannot be shown`;
      return res.status(500).json(myError);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updatemyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { sessionUser } = req;

    const user = await authService.findOneUserById(sessionUser.id);
    if (user.dataValues.status !== "available") {
      let myError = `The id ${user.dataValues.id} does not exist on db, therefore, it cannot be modified`;
      return res.status(500).json(myError);
    }

    const { name } = req.body || sessionUser.dataValues.name;
    const { email } = req.body || sessionUser.dataValues.email;

    if (id !== user.id) {
      let myError = `The id ${id} is not the id of the current user, therefore it cannot be modified. try id ${user.id} instead.`;
      return res.status(500).json(myError);
    }

    await authService.updateUser(user, name, email);

    return res.status(200).json({
      message: "The user has been updated successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deletemyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { sessionUser } = req;

    const user = await authService.findOneUserById(sessionUser.id);

    if (user.dataValues.status !== "available") {
      let myError = `The id ${user.dataValues.id} does not exist on db, therefore, it cannot be deleted`;
      return res.status(500).json(myError);
    }

    await authService.deleteUser(user);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await authService.findOneUserById(id);

    if (user.dataValues.status !== "available") {
      let myError = `The id ${user.dataValues.id} does not exist on db, therefore, it cannot be deleted`;
      return res.status(500).json(myError);
    }

    await authService.deleteUser(user);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};
