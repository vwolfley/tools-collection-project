const { body, validationResult } = require("express-validator");

const validate = {};

/*  **********************************
 *  Tools Data Validation Rules
 * ********************************* */
validate.toolsRules = () => {
  return [
    // name is required and must be string
    body("name")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Name cannot be empty"),

    // brand is required and must be string
    body("brand")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Brand cannot be empty"),

    // model_number is NOT required and must be string
    body("model_number").optional({ checkFalsy: true }).trim().escape(),

    // category is NOT required and must be string
    body("category").optional({ checkFalsy: true }).trim().escape(),

    // size is NOT required and must be string
    body("size").optional({ checkFalsy: true }).trim().escape(),

    // power_source is NOT required and must be string
    body("power_source").optional({ checkFalsy: true }).trim().escape(),

    // voltage is NOT required and must be string
    body("specifications.voltage").optional({ checkFalsy: true }).trim().escape(),

    // rpm is NOT required and must be string
    body("specifications.rpm").optional({ checkFalsy: true }).trim().escape(),

    // battery_type is NOT required and must be string
    body("specifications.battery_type").optional({ checkFalsy: true }).trim().escape(),

    // image_url is NOT required and must be string
    body("image_url")
      .optional({ checkFalsy: true })
      .trim()
      .escape()
      .isURL({ protocols: ["http", "https"], require_protocol: true })
      .withMessage("Image URL must be a valid URL starting with http or https."),
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
