const toolsController = require("../../controllers/toolsController"); // Adjust path as needed
const mongodb = require("../db/mongo"); // Adjust path as needed

jest.mock("../db/mongo"); // Mock MongoDB module

describe("toolsController.getAll", () => {
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
    mockCursor.toArray.mockResolvedValue(mockTools);

    await toolsController.getAll(req, res, next);

    expect(mongodb.getDb).toHaveBeenCalled();
    expect(mockDb.collection).toHaveBeenCalledWith("tools");
    expect(mockCollection.find).toHaveBeenCalled();
    expect(mockCursor.toArray).toHaveBeenCalled();
    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTools);
  });

  test("should return 500 on unexpected error", async () => {
    const mockError = new Error("Database error");
    mockCursor.toArray.mockRejectedValue(mockError);

    await toolsController.getAll(req, res, next);

    expect(mongodb.getDb).toHaveBeenCalled();
    expect(mockDb.collection).toHaveBeenCalledWith("tools");
    expect(mockCollection.find).toHaveBeenCalled();
    expect(mockCursor.toArray).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An unexpected error occurred.",
      error: "Database error",
    });
  });
});
