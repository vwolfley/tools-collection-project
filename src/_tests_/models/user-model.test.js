// To run this test, use the following command:
// npx jest user-model.test.js

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const userModel = require("../../models/user-model");
const bcrypt = require("bcryptjs");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Model", () => {
  const sampleUser = {
    username: "testuser",
    firstName: "John",
    lastName: "Doe",
    email: "test@example.com",
    phoneNumber: "1234567890",
    password: "password123",
  };

  let hashedPassword;

  beforeEach(async () => {
    hashedPassword = await bcrypt.hash(sampleUser.password, 10);
    await userModel.createUser(
      sampleUser.username,
      sampleUser.firstName,
      sampleUser.lastName,
      sampleUser.email,
      sampleUser.phoneNumber,
      hashedPassword,
    );
  });

  afterEach(async () => {
    await userModel.user.deleteMany({});
  });

  test("should retrieve all users", async () => {
    const users = await userModel.getAllUsers();
    expect(users.length).toBe(1);
    expect(users[0].username).toBe(sampleUser.username);
  });

  test("should retrieve a user by username", async () => {
    const user = await userModel.getUser({ username: sampleUser.username });
    expect(user).toBeTruthy();
    expect(user.email).toBe(sampleUser.email);
  });

  test("should create a new user", async () => {
    const newUser = await userModel.createUser(
      "newuser",
      "Alice",
      "Smith",
      "alice@example.com",
      "9876543210",
      hashedPassword,
    );
    expect(newUser).toBeTruthy();
    expect(newUser.username).toBe("newuser");
  });

  test("should update a user", async () => {
    const updatedUser = await userModel.updateUser(
      sampleUser.username,
      "Jane",
      "Doe",
      "jane@example.com",
      "5555555555",
    );
    expect(updatedUser).toBeTruthy();
    expect(updatedUser.firstName).toBe("Jane");
    expect(updatedUser.email).toBe("jane@example.com");
  });

  test("should delete a user", async () => {
    await userModel.deleteUser(sampleUser.username);
    const user = await userModel.getUser({ username: sampleUser.username });
    expect(user).toBeNull();
  });
});
