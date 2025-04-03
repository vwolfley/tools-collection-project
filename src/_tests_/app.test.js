// To run this test, use the following command:
// npx jest app.test.js

const request = require("supertest");
const server = require("../../server");
const app = require("../../app");

// Mock the database module
jest.mock("../database/mongoose-connect.js", () => ({
  query: jest.fn(),
}));

const { query } = require("./db");

describe("server", () => {
  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop?.(); // Only call stop if it exists
  });

  it("should start the server successfully", async () => {
    const mockListen = jest.spyOn(app, "listen").mockImplementation(() => {});
    await server.start();
    expect(mockListen).toHaveBeenCalled();
    mockListen.mockRestore();
  });

  it("should handle errors during startup", async () => {
    const mockListen = jest.spyOn(app, "listen").mockImplementation(() => {
      throw new Error("Failed to start server");
    });

    await expect(server.start()).rejects.toThrow("Failed to start server");
    mockListen.mockRestore();
  });

  it("should handle a specific route", async () => {
    query.mockResolvedValue([{ id: 1, name: "Test" }]);

    const response = await request(app).get("/data");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Test" }]);
  });
});
