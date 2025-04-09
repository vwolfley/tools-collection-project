// To run this test, use the following command:
// npx jest app.test.js

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../../app");

let mongoServer;

// Mock the database module
jest.mock("../database/mongoose-connect", () => ({
  query: jest.fn(),
}));

const { query } = require("./db");

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("app", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should start the server successfully", async () => {
    const mockListen = jest.spyOn(app, "listen").mockImplementation(() => {});
    await app.start();
    expect(mockListen).toHaveBeenCalled();
    mockListen.mockRestore();
  });

  it("should handle errors during startup", async () => {
    const mockListen = jest.spyOn(app, "listen").mockImplementation(() => {
      throw new Error("Failed to start server");
    });

    await expect(app.start()).rejects.toThrow("Failed to start server");
    mockListen.mockRestore();
  });

  it("should handle a specific route", async () => {
    query.mockResolvedValue([{ id: 1, name: "Test" }]);

    const response = await request(app).get("/data");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Test" }]);
  });
});
