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
      .escape()
      .notEmpty()
      .withMessage('Username cannot be empty')
      .isLength({ min: 2 })
      .withMessage("Please provide a username."),

    // password is required and must be string
    body("password")
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    .withMessage('Password does not meet requirements.'),

    // firstName is required and must be string
    body("firstName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage('First Name cannot be empty')
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."),

    // lastName is required and must be string
    body("lastName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Last Name cannot be empty')
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."),

    // valid email is required
    body("email")
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required."),

    // valid phone number is required
    body("phoneNumber")
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Phone number cannot be empty')
      .isLength({ min: 10, max: 10 })
      .withMessage("Please provide a valid phone number."),
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
