// To run this test, use the following command:
// npx jest tool-model.test.js

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const toolModel = require("../../models/tool-model");

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

describe("Tool Model", () => {
  beforeEach(async () => {
    await toolModel.tool.deleteMany({});
  });

  test("should create a new tool", async () => {
    const toolData = {
      tool: "Drill",
      brand: "DeWalt",
      model_number: "DCD777C2",
      category: "Power Tool",
      size: "Medium",
      power_source: "battery",
      specifications: [{ name: "Voltage", value: "20V" }],
      description: "Cordless drill",
      image_url: "http://example.com/drill.jpg",
    };

    const createdTool = await toolModel.createTool(
      toolData.tool,
      toolData.brand,
      toolData.model_number,
      toolData.category,
      toolData.size,
      null, // No set_id
      toolData.power_source,
      toolData.specifications,
      toolData.description,
      toolData.image_url,
    );

    expect(createdTool).toHaveProperty("_id");
    expect(createdTool.tool).toBe("Drill");
    expect(createdTool.brand).toBe("Dewalt");
    expect(createdTool.specifications).toHaveLength(1);
    expect(createdTool.specifications[0].name).toBe("Voltage");
  });

  test("should get all tools", async () => {
    await toolModel.createTool(
      "Saw",
      "Makita",
      "XSS02Z",
      "Power Tool",
      "Large",
      null,
      "battery",
      [],
      "Circular saw",
      "http://example.com/saw.jpg",
    );

    const tools = await toolModel.getAllTools();
    expect(tools.length).toBe(1);
    expect(tools[0].tool).toBe("Saw");
  });

  test("should get a tool by parameter", async () => {
    const toolData = await toolModel.createTool(
      "Hammer",
      "Stanley",
      "51-624",
      "Hand Tool",
      "Medium",
      null,
      "manual",
      [],
      "Steel hammer",
      "http://example.com/hammer.jpg",
    );

    const fetchedTool = await toolModel.getTool({ _id: toolData._id });
    expect(fetchedTool.tool).toBe("Hammer");
  });

  test("should update a tool", async () => {
    const toolData = await toolModel.createTool(
      "Wrench",
      "Husky",
      "H1234",
      "Hand Tool",
      "Small",
      null,
      "manual",
      [],
      "Adjustable Wrench",
      "http://example.com/wrench.jpg",
    );

    const updatedTool = await toolModel.updateTool(
      toolData._id,
      "Adjustable Wrench",
      toolData.brand,
      toolData.model_number,
      toolData.category,
      toolData.size,
      toolData.set_id,
      toolData.power_source,
      toolData.specifications,
      toolData.description,
      toolData.image_url,
    );

    expect(updatedTool.tool).toBe("Adjustable wrench");
  });

  test("should delete a tool", async () => {
    const toolData = await toolModel.createTool(
      "Screwdriver",
      "Bosch",
      "B456",
      "Hand Tool",
      "Small",
      null,
      "manual",
      [],
      "Phillips screwdriver",
      "http://example.com/screwdriver.jpg",
    );

    const deletedTool = await toolModel.deleteTool(toolData._id);
    expect(deletedTool).not.toBeNull();

    const fetchDeleted = await toolModel.getTool({ _id: toolData._id });
    expect(fetchDeleted).toBeNull();
  });
});
