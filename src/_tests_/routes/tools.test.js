// To run this test, use the following command:
// npx jest tools.test.js

const request = require("supertest");
const express = require("express");
const toolsRouter = require("../../routes/tools");
const app = express();

app.use(express.json());
app.use("/tools", toolsRouter);

describe("Tools API Routes", () => {

  test("GET /tools should return all tools", async () => {
    const response = await request(app).get("/tools");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // test("GET /tools/:id should return a tool by ID", async () => {
  //   const response = await request(app).get("/tools/1");
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty("id", 1);
  // });

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
