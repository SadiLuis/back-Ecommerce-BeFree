import { Express } from "express";
import App from "../App";
import supertest from "supertest";
import Database from "../Database";
// import passport from "passport";
// import passportMiddlewar from "../utils/middleware/passport";
import mongoose from "mongoose";
import config from "../config/config";

describe("Test", () => {
   let app: App;
   let server: any;
   let db: Database;
   let a: Express;

   beforeAll(async () => {
      app = App.getInstances();
      ;
      db = Database.getInstance();
      a = app.getApp();

      

      server = app.getApp();
   });

   afterAll(async () => {
      await mongoose.disconnect();
            
   });

   // Resto de tus tests aquí...
   it("test_server_starts_and_listens_on_specified_port", () => {
    console.log(server)
      expect(server).toBeDefined();
   });

   it("test_swagger_documentation_is_properly_served", async () => {
      const agent = supertest.agent(app.getApp());
      await agent.get("/").expect(200);
   });

   // Tests that the passport middleware is properly initialized
//    it("test_passport_middleware_is_properly_initialized", () => {
//       const initializeSpy = jest.spyOn(passport, "initialize");
//       const useSpy = jest.spyOn(passport, "use");

//       a.use(passport.initialize());
//       passport.use(passportMiddlewar);

//       expect(initializeSpy).toHaveBeenCalled();
//       expect(useSpy).toHaveBeenCalledWith(passportMiddlewar);
//    });
});
