const usersController = require("../../controllers/usersController"); // Adjust the path as needed
const userModel = require("../../models/user-model"); // Adjust the path as needed

jest.mock("../../models/user-model", () => ({
  deleteUser: jest.fn(),
}));

describe("usersController.deleteUser", () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: { username: "testuser" } }; // Mock request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("should delete a user successfully and return status 200", async () => {
    const mockDeletedUser = { username: "testuser", email: "test@example.com" };
    userModel.deleteUser.mockResolvedValue(mockDeletedUser);

    await usersController.deleteUser(req, res, next);

    expect(userModel.deleteUser).toHaveBeenCalledWith(mockDeletedUser.username);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User deleted successfully.",
      user: mockDeletedUser.username,
    });
  });

  test("should return 404 when user is not found", async () => {
    userModel.deleteUser.mockResolvedValue(null);

    await usersController.deleteUser(req, res, next);

    expect(userModel.deleteUser).toHaveBeenCalledWith("testuser");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found." });
  });

  test("should return 500 on unexpected error", async () => {
    const mockError = new Error("Database error");
    userModel.deleteUser.mockRejectedValue(mockError);

    await usersController.deleteUser(req, res, next);

    expect(userModel.deleteUser).toHaveBeenCalledWith("testuser");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An unexpected error occurred.",
      error: "Database error",
    });
  });
});
