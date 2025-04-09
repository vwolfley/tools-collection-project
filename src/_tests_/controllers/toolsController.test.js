const toolsController = require("../../controllers/toolsController"); // Adjust path as needed
const toolModel = require("../../models/tool-model"); // Adjust path as needed
const mongodb = require("../../database/mongo-connect"); // Adjust path as needed

jest.mock("../../database/mongo-connect"); // Mock MongoDB module

jest.mock("../../models/tool-model", () => ({
  getAllTools: jest.fn(),
  getTool: jest.fn(),
}));

describe("toolsController.getAllTools", () => {
  let req, res, next, mockDb, mockCollection, mockCursor;

  beforeEach(() => {
    req = {}; // Mock request object (no params needed)
    res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    // Mock MongoDB methods
    mockCursor = { toArray: jest.fn() };
    mockCollection = { find: jest.fn().mockReturnValue(mockCursor) };
    mockDb = { collection: jest.fn().mockReturnValue(mockCollection) };
    mongodb.getDb.mockReturnValue({ db: jest.fn().mockReturnValue(mockDb) });
  });

  test("should return all tools with status 200", async () => {
    const mockTools = [{ name: "Hammer" }, { name: "Screwdriver" }];
    toolModel.getAllTools.mockResolvedValue(mockTools);

    await toolsController.getAllTools(req, res, next);

    expect(toolsController.getAllTools)
    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTools);
  });

  test("should return 500 on unexpected error", async () => {
    const mockError = new Error("Database error");
    toolModel.getAllTools.mockRejectedValue(mockError); // Simulate error

    await toolsController.getAllTools(req, res, next);
;
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An unexpected error occurred.",
      error: "Database error",
    });
  });
});
