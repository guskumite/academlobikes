import { body, validationResult } from "express-validator";

export const userValidationRules = () => {
  return [
    body("name")
      .isLength({ min: 3, max: 100 })
      .withMessage("Invalid name length: minumum: 3, maximum: 100"),
    // password must be at least 12 chars long
    body("password")
      .isLength({ min: 12 })
      .withMessage("Invalid password length, minumum: 12"),
    body("email").isEmail().withMessage("Invalid mail format"),
  ];
};

export const repairValidationRules = () => {
  return [
    body("dayofservice")
      .isLength({ min: 10 })
      .withMessage("Invalid date format"),
    body("motorsNumber")
      .isInt()
      .withMessage("Invalid format: must be an integer"),
    body("description")
      .isLength({ min: 3, max: 55 })
      .withMessage("Description must be between 3 and 55 chars"),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
