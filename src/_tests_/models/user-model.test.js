const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../../models/user-model"); // Adjust the path as needed

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("User Model", () => {
  beforeEach(async () => {
    await User.deleteMany(); // Clear database before each test
  });

  test("should create and save a user successfully", async () => {
    const userData = {
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      phoneNumber: "123-456-7890",
      email: "test@example.com",
      password: "securepassword",
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.role).toBe("user"); // Default role should be "user"
  });

  test("should not save a user without required fields", async () => {
    const user = new User({ username: "testuser" }); // Missing required fields

    await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  test("should enforce unique constraint on username and email", async () => {
    const userData = {
      username: "uniqueuser",
      firstName: "John",
      lastName: "Doe",
      email: "unique@example.com",
      password: "password123",
    };

    await new User(userData).save(); // Save first user

    const duplicateUser = new User(userData); // Attempt to save duplicate

    await expect(duplicateUser.save()).rejects.toThrow();
  });

  test("should set default role to 'user' if not provided", async () => {
    const user = new User({
      username: "noroleuser",
      firstName: "NoRole",
      lastName: "User",
      email: "norole@example.com",
      password: "password123",
    });

    const savedUser = await user.save();
    expect(savedUser.role).toBe("user"); // Default role should be "user"
  });
});
