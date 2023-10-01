import { z } from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

const repairSchema = z.object({
  status: z.string(),
  userid: z.number(),
});

export const validateRepair = (data) => {
  const result = repairSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: dataRepair,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    dataRepair,
  };
};
