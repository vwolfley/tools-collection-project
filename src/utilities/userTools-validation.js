const { body, validationResult } = require("express-validator");

const validate = {};

/*  **********************************
 *  UserTools Data Validation Rules
 * ********************************* */
validate.userToolsRules = () => {
  return [
    // serial number is required and must be string
    body("serial_number").optional({ checkFalsy: true }).trim().escape(),

    // condition is required and must be string
    body("condition").optional({ checkFalsy: true }).trim().escape(),

    // purchase date is not required and must be a date
    body("purchase_date")
      .optional({ checkFalsy: true })
      .trim()
      .escape()
      .isDate()
      .withMessage("Purchase Date must be a date."),

    // price is not required and must be a number
    body("price")
      .optional({ checkFalsy: true })
      .trim()
      .escape()
      .isNumeric()
      .withMessage("Price must be a number."),

    // location is not required and must be a string
    body("location").optional({ checkFalsy: true }).trim().escape(),

    // notes is not required and must be a string
    body("notes").optional({ checkFalsy: true }).trim().escape(),

    // loanedTo is not required and must be a string
    body("loanedTo").optional({ checkFalsy: true }).trim().escape(),
  ];
};

/* ******************************
 *  Check data and return errors or continue to update
 * ***************************** */
validate.checkUserToolsData = async (req, res, next) => {
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
