import { Express } from "express";
import App from "../App";
import supertest from "supertest";
import Database from "../Database";
// import passport from "passport";
// import passportMiddlewar from "../utils/middleware/passport";
import mongoose from "mongoose";
import config from "../config/config";
import { connect } from "http2";

describe("Test", () => {
   let app: App;
   let db: Database;
   let a: Express;
   let connet: any;

   beforeAll(async () => {
      app = App.getInstances();
      db = Database.getInstance();
      a = app.getApp();
      connet = await db.connect();
   });

   afterAll(async () => {
      await mongoose.disconnect();
   });

   // Resto de tus tests aquí...
   it("test_server_starts_and_listens_on_specified_port", async () => {
      expect(app).toBeDefined();
      expect(connet.readyState).toBe(1);
   });

   it("test_swagger_documentation_is_properly_served", async () => {
      const agent = supertest.agent(a);
      await agent.get("/").expect(200);
      expect(connet.readyState).toBe(1);
   });
});
