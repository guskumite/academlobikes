import z from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

const userSchema = z.object({
  name: z.string().min(3).max(90),
  email: z.string().min(3).max(90),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*]+)(?=.*[A-Z])(?=.*[a-z]).{8,}$/),
  role: z.string(),
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
