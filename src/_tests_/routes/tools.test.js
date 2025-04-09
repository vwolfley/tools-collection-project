// To run this test, use the following command:
// npx jest tools.test.js

//https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const express = require("express");
const toolsRouter = require("../../routes/tools");
const app = express();

app.use(express.json());
app.use("/tools", toolsRouter);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Tools API Routes", () => {

  test("GET /tools should return all tools", async () => {
    const response = await request(app).get("/tools");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /tools/:id should return a tool by ID", async () => {
    const response = await request(app).get("/tools/67a3fed4f25c939609de71fd");
    console.log("response", response.statusCode);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Product 1");
  });

  // test("POST /tools should create a new tool", async () => {
  //   const newTool = { name: "Hammer", category: "Hand Tools" };
  //   const response = await request(app).post("/tools").send(newTool);
  //   expect(response.status).toBe(201);
  //   expect(response.body).toHaveProperty("id");
  // });

  // test("PUT /tools/:id should update a tool", async () => {
  //   const updatedTool = { name: "Updated Hammer", category: "Hand Tools" };
  //   const response = await request(app).put("/tools/1").send(updatedTool);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty("name", "Updated Hammer");
  // });

  // test("DELETE /tools/:id should delete a tool", async () => {
  //   const response = await request(app).delete("/tools/1");
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty("message");
  // });
});
