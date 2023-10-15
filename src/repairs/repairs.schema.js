import { z } from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

const repairSchema = z.object({
  status: z.string(),
  userid: z.number(),
  dayofservice: z.string(),
  description: z.string().min(1).max(55),
  motorsNumber: z.number(),
});

export const validateRepair = (data) => {
  const parsedDate = new Date(data.dayofservice);
  const isoDate = parsedDate.toISOString();
  data.dayofservice = isoDate;
  const result = repairSchema.safeParse(data);

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
