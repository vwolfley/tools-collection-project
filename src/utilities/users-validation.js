const { body, validationResult } = require("express-validator");

const validate = {};

/*  **********************************
 *  User Data Validation Rules
 * ********************************* */
validate.usersRules = () => {
  return [
    // username is required and must be string
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required.")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be 3-20 characters long.")
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage("Username can only contain letters, numbers, underscores, or dashes.")
      .not()
      .matches(/^[-_]/)
      .withMessage("Username cannot start with a hyphen or underscore.")
      .not()
      .matches(/[-_]$/)
      .withMessage("Username cannot end with a hyphen or underscore.")
      .matches(/^\S+$/).withMessage("Username cannot contain spaces."),

    // password is required and must be string
    body("password")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Password cannot be empty")
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),

    // firstName is required and must be string
    body("firstName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("First Name cannot be empty")
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."),

    // lastName is required and must be string
    body("lastName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Last Name cannot be empty")
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."),

    // valid email is required
    body("email")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required."),

    // valid phone number is required
    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number cannot be empty")
      .matches(/^\d{10}$/)
      .withMessage("Please enter a valid 10-digit phone number (numbers only)."),
  ];
};


/*  **********************************
 *  User Update Data Validation Rules
 * ********************************* */
validate.userUpdateRules = () => {
  return [
    // firstName is required and must be string
    body("firstName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("First Name cannot be empty")
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."),

    // lastName is required and must be string
    body("lastName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Last Name cannot be empty")
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."),

    // valid email is required
    body("email")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required."),

    // valid phone number is required
    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number cannot be empty")
      .matches(/^\d{10}$/)
      .withMessage("Please enter a valid 10-digit phone number (numbers only)."),
  ];
};

/* ******************************
 *  Check data and return errors or continue to update
 * ***************************** */
validate.checkUsersData = async (req, res, next) => {
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
