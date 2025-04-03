const { body, validationResult } = require("express-validator");

const validate = {};

/*  **********************************
 *  Tools Data Validation Rules
 * ********************************* */
validate.toolsRules = () => {
  return [
    // tool (name) is required and must be a string
    body("tool")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Tool name cannot be empty"),

    // brand is required and must be a string
    body("brand")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Brand cannot be empty"),

    // model_number is NOT required and must be a string
    body("model_number").optional({ checkFalsy: true }).trim().escape(),

    // category is NOT required and must be a string
    body("category").optional({ checkFalsy: true }).trim().escape(),

    // size is NOT required and must be a string
    body("size").optional({ checkFalsy: true }).trim().escape(),

    // set_id is NOT required but must be a valid MongoDB ObjectId if provided
    body("set_id").optional({ checkFalsy: true }).isMongoId().withMessage("Invalid set_id format."),

    // power_source is NOT required but must be one of the allowed values
    body("power_source")
      .optional({ checkFalsy: true })
      .isIn(["battery", "corded", "manual"])
      .withMessage('Power source must be "battery", "corded", or "manual".'),

    // specifications should be an array of objects with name & value
    body("specifications")
      .optional({ checkFalsy: true })
      .isArray()
      .withMessage("Specifications must be an array"),

    // Validate each specification object
    body("specifications.*.name")
      .optional({ checkFalsy: true })
      .isIn(["Voltage", "RPM", "Battery Type", "Torque", "Amperage", "Weight", "Dimensions"])
      .withMessage("Invalid specification name"),

    body("specifications.*.value")
      .optional({ checkFalsy: true })
      .trim()
      .escape()
      .isString()
      .withMessage("Specification value must be a string"),

    // description is NOT required but must be a string
    body("description").optional({ checkFalsy: true }).trim().escape(),

    // image_url is NOT required but must be a valid URL
    body("image_url")
      .optional({ checkFalsy: true })
      .trim()
      .isURL({ protocols: ["http", "https"], require_protocol: true })
      .withMessage("Image URL must be a valid URL starting with http or https.")
      .escape(),
  ];
};

/* ******************************
 *  Check data and return errors or continue to update
 * ***************************** */
validate.checkToolsData = async (req, res, next) => {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({
      success: false,
      message: "Validation failed",
      data: errors.array(),
    });
    return;
  }
  next();
};

module.exports = validate;
