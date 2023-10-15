import z from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

const userSchema = z.object({
  name: z.string().min(3).max(90),
  email: z.string().min(3).max(90),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*]+)(?=.*[A-Z])(?=.*[a-z]).{8,}$/),
  role: z.enum([
    "receptionist",
    "admin",
    "developer",
    "manager",
    "user",
    "employee",
  ]),
  status: z.string(),
});

const userLimitedSchema = z.object({
  name: z.string().min(3).max(90),
  email: z.string().min(3).max(90),
});

export const validateUser = (data) => {
  const result = userSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};

export const validatePartialUser = (data) => {
  const result = userLimitedSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: dataUser,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    dataUser,
  };
};

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(199, { message: "Name is too long" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password is too short" }),
  role: z.enum([
    "receptionist",
    "admin",
    "developer",
    "manager",
    "user",
    "employee",
  ]),
});

const loginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password is too short" }),
});

export const validateRegister = (data) => {
  const result = registerSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};

export const validateLogin = (data) => {
  const result = loginUserSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};
