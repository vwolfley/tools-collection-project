const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }

  mongoose
    .connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.connection;
      console.log("MongoDB connected successfully.");
      callback(null, _db);
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = { initDb, getDb };
