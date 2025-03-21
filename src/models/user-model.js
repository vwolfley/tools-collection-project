const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = {};

// Define a schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  firstName: {
    type: String,
    required: true,
    set: (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
  },
  lastName: {
    type: String,
    required: true,
    set: (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
  },
  phoneNumber: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);

/* *****************************
 *   Get All Users
 * *************************** */
userModel.getAllUsers = async function () {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    return error.message;
  }
};

/* **************************
 * Get user by parameter
 ****************************/
userModel.getUser = async function (parameter) {
  try {
    const result = await User.findOne(parameter).exec();
    return result;
  } catch (error) {
    console.error(`Error fetching user "${parameter}":`, error);
    return error.message;
  }
};

/* *****************************
 *   Creating a new user
 * *************************** */
userModel.createUser = async function (
  username,
  firstName,
  lastName,
  email,
  phoneNumber,
  hashedPassword,
) {
  try {
    // Create and save new user document
    const newUser = await User.create({
      username: username.toLowerCase(),
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return error.message;
  }
};

/* *****************************
 *   Update a user
 * *************************** */
userModel.updateUser = async function (username, firstName, lastName, email, phoneNumber) {
  try {
     // Filter out undefined values to prevent overwriting existing data
     const updateFields = {};
     if (firstName !== undefined) updateFields.firstName = firstName;
     if (lastName !== undefined) updateFields.lastName = lastName;
     if (email !== undefined) updateFields.email = email;
     if (phoneNumber !== undefined) updateFields.phoneNumber = phoneNumber;
    // Update user document
    const result = await User.findOneAndUpdate(
      { username}, // Find user by current username
      { $set: updateFields  }, // Update only provided fields
      { new: true, runValidators: true }, // Return updated document & enforce schema validation
    );
    return result;
  } catch (error) {
    console.error(`Error updating user "${username}":`, error);
    return error.message;
  }
};

/* *****************************
 *   Delete a user
 * *************************** */
userModel.deleteUser = async function (username) {
  try {
    const result = await User.findOneAndDelete({ username: username.toLowerCase() }).exec();
    return result;
  } catch (error) {
    console.error(`Error deleting user "${username}":`, error);
    return error.message;
  }
};

module.exports = userModel;
