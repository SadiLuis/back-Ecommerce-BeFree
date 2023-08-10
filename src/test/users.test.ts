import { Express } from "express";
import mongoose, { isValidObjectId, ObjectId } from "mongoose";
import request from "supertest";
import App from "../App";
import Database from "../Database";
import UserModels from "../models/users/User.models";
import IUser from "../models/users/interfaces/User.interfaces";
import UserDTO from "../models/users/DTO/User.DTO";
import { managerHelper, userHelper } from "./helper/helper";


describe("Test", () => {
   let app: App;
   let db: Database;
   let a: Express;
   let connet: any;
   let api: any;

   beforeAll(async () => {
      app = App.getInstances();
      a = app.getApp();
      db = Database.getInstance();
      connet = await db.connect();
      api = request(a);
   });
   beforeEach(async () => {
      await managerHelper.userManagerhelper.getModel().deleteMany({});
   });

   afterAll(async () => {
      // await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
   });

   describe("test user Controller", () => {
      test("get all users", async () => {
         const response = await api
            .get("/api/v1/users")
            .expect(200)
            .expect("Content-Type", /json/);

         expect(response.body).toBeDefined();
         expect(Array.isArray(response.body)).toBeTruthy();
      });
      describe("get user by id", () => {
         test("user not found", async () => {
            const idUser = "618a2d5d0f2b8d0f8b8f9f0c";
            const response = await api
               .get(`/api/v1/user/${idUser}`)
               .expect(404)
               .expect("Content-Type", /application\/json/);

            expect(response.body).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toContain("User not found");
         });

         test("user found", async () => {
            const user = {
               email: "XXXXXXXXXXXXXX",
               password: "XXXXXXXXXXXXXX",
               name: "XXXXXXXXXXXXXX",
               username: "XXXXXXXXXXXXXX",
            };
            const userMock = await managerHelper.userManagerhelper.create(user);
            const response = await api
               .get(`/api/v1/user/${userMock._id}`)
               .expect(200)
               .expect("Content-Type", /application\/json/);

            expect(response.body).toBeDefined();
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body._id).toBeDefined()
            // expect(response.body.message).toContain("User found")
         });
      });

      describe("create user", () => {
         test("filds are required", async () => {
            const user = {
               email: "",
               password: "",
               name: "",
               username: "",
            };
            const response = await api
               .post("/api/v1/signUp")
               .send(user)
               .expect(400)
               .expect("Content-Type", /application\/json/);

            expect(response.body).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toContain(
               "Please, send all the fields"
            );
         });
         test("all fields are required", async () => {
            const user = {
               email: "XXXXXXXXXXXXXX",
               password: "XXXXXXXXXXXXXX",
               name: "",
               username: "XXXXXXXXXXXXXX",
            };
            const response = await api
               .post("/api/v1/signUp")
               .send(user)
               .expect(400)
               .expect("Content-Type", /application\/json/);

            expect(response.body).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toContain(
               "Please, send all the fields"
            );
         });
         test("password not match", async () => {
            const userHelperTemp = {
               ...userHelper,
               password: "ZZZZZZZ",
            };

            const response = await api
               .post("/api/v1/signUp")
               .send(userHelperTemp)
               .expect(400)
               .expect("Content-Type", /application\/json/);

            expect(response.body).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toContain(
               "The passwords do not match"
            );
         });

         test("email is invalid", async () => {
            const user: UserDTO = {
               email: "XXXXXXXXXXXXXX",
               password: "XXXXXXXXXXXXXX",
               name: "XXXXXXXXXXXXXX",
               username: "XXXXXXXXXXXXXX",
               phone: "",
               address: "",
               avatar: "",
               lastname: "",
               city: "",
               country: "",
            };

            await managerHelper.userManagerhelper.create(
               user
            );
            const response = await api
               .post("/api/v1/signUp")
               .send(userHelper)
               .expect(409)
               .expect("Content-Type", /application\/json/);

            expect(response.body).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toContain("The user already exists");
         });

         test("user created", async () => {
            const response = await api
               .post("/api/v1/signUp")
               .send(userHelper)
               .expect(201)
               .expect("Content-Type", /application\/json/);

            expect(response.body).toBeDefined();
            expect(response.body._id).toBeDefined();
            expect(response.body.email).toBeDefined();
            expect(response.body.role).toBeDefined();
            
         
         })
      });

      describe("login user", () => {
         test("filds are required", async () => {
            const user = {
               email: "",
               password: "",
            };
            const response = await api
               .post("/api/v1/signIn")
               .send(user)
               .expect(400)
               .expect("Content-Type", /application\/json/);

            expect(response.body).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toContain(
               "Please, send all the fields"
            );
         
         })

         test("all fields are required", async () => {
            const user={
               email: "XXXXXXXXXXXXXX",
               password: "",
            }

         })

         test("user not found", async () => {
            const user = {
               email: "XXXXXXXXXXXXXX",
               password: "XXXXXXXXXXXXXX",
            };
            const response = await api
               .post("/api/v1/signIn")
               .send(user)
               .expect(404)
               .expect("Content-Type", /application\/json/);

            expect(response.body).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toContain("The email does not valid");
         
         })

         test("password not match", async () => {
            const user = {
               email: "XXXXXXXXXXXXXX",
               password: "ZZZZZZ",
               username: "XXXXXXXXXXXXXX",
               name: "XXXXXXXXXXXXXX",
            };
            await managerHelper.userManagerhelper.create(user)
            const response = await api
               .post("/api/v1/signIn")
               .send(userHelper)
               .expect(401)
               .expect("Content-Type", /application\/json/);

            expect(response.body).toBeDefined();
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toContain("The password does not valid");
         
         
         })
         test("user login", async () => {
            await managerHelper.userManagerhelper.create({
               email: userHelper.email,
               password: userHelper.password,
               username: userHelper.username,
               name: userHelper.name,
            });

            const response = await api
               .post("/api/v1/signIn")
               .send({
                  email: userHelper.email,
                  password: userHelper.password,
               })
               .expect(200)
               .expect("Content-Type", /application\/json/);

            expect(response.body).toBeDefined();
            expect(response.body.token).toBeDefined();
         })
      })
   });
});
