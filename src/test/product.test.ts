import { Express } from "express";
import request from "supertest";
import App from "../App";
import Database from "../Database";
import mongoose from "mongoose";
import { managerHelper, productHelper } from "./helper/helper";

describe("Test the products route", () => {
   let app: Express;
   let api: request.SuperTest<request.Test>;
   let DB: Database;

   beforeAll(async () => {
      app = App.getInstances().getApp();
      DB = Database.getInstance();
      await DB.connect();
      api = request(app);
   });

   beforeEach(async () => {
      await managerHelper.productManager.getModel().deleteMany({});
   });

   afterAll(async () => {
      await managerHelper.productManager.getModel().deleteMany({});
      await mongoose.disconnect();
   });

   describe("Test the get products route", () => {
      test("It should return an empty array", async () => {
         const response = await api.get("/api/v1/products");
         expect(response.statusCode).toBe(200);
         expect(response.body).toEqual([]);
      });

      test("It should return an array with one product", async () => {
         await managerHelper.productManager.create(productHelper);
         await managerHelper.productManager.create(productHelper);
         const response = await api.get("/api/v1/products");
         expect(response.statusCode).toBe(200);
         expect(response.body.length).toBe(2);
      });
   });

   describe("Test the get product route", () => {
      test("It should return a 404 error", async () => {
         const idProduct = "618a2d5d0f2b8d0f8b8f9f0c";
         const response = await api.get(`/api/v1/product/${idProduct}`);

         expect(response.statusCode).toBe(404);
         expect(response.body.message).toBeDefined();
         expect(response.body.message).toBe("Product not found");
      });

      test("It should return a product", async () => {
         const product = await managerHelper.productManager.create(
            productHelper
         );
         const idProduct = product._id;
         const response = await api.get(`/api/v1/product/${idProduct}`);
         expect(response.statusCode).toBe(200);
         expect(response.body._id).toBeDefined();
      });
   });

   describe("Test the create product route", () => {
      test("It should return a 400 error", async () => {
         const response = await api.post("/api/v1/product");

         expect(response.statusCode).toBe(400);
         expect(response.body.message).toBeDefined();
         expect(response.body.message).toBe("All fields are required");
      });
      test("It should return a 400 error if name is empty", async () => {
         const product = { ...productHelper, name: "" };
         const response = await api.post("/api/v1/product").send(product);

         expect(response.statusCode).toBe(400);
         expect(response.body.message).toBeDefined();
         expect(response.body.message).toBe("All fields are required");
      });

      test("It should return a 400 error if length description smaller than 70", async () => {
         const product = { ...productHelper, description: "a".repeat(69) };
         const response = await api.post("/api/v1/product").send(product);

         expect(response.statusCode).toBe(400);
         expect(response.body.message).toBeDefined();
         expect(response.body.message).toBe(
            "Description must be 70 characters or less"
         );
      });

      test("It should return a product", async () => {
         const response = await api.post("/api/v1/product").send(productHelper);
         expect(response.statusCode).toBe(201);
         expect(response.body._id).toBeDefined();
      });
   });

   describe("Test the update product route", () => {
      test("It should return a 404 error", async () => {
         const idProduct = "618a2d5d0f2b8d0f8b8f9f0c";
         const response = await api
            .put(`/api/v1/product/${idProduct}`)
            .send(productHelper);
         expect(response.statusCode).toBe(404);
         expect(response.body.message).toBeDefined();
         expect(response.body.message).toBe("Product not found");
      });

      test("It should return a product", async () => {
         const product = await managerHelper.productManager.create(
            productHelper
         );
         const idProduct = product._id;
         const response = await api
            .put(`/api/v1/product/${idProduct}`)
            .send(productHelper);
         expect(response.statusCode).toBe(200);
         expect(response.body._id).toBeDefined();
      });
   });

   describe("Test the delete product route", () => {
      test("It should return a 404 error", async () => {
         const idProduct = "618a2d5d0f2b8d0f8b8f9f0c";
         const response = await api.delete(`/api/v1/product/${idProduct}`);
         expect(response.statusCode).toBe(404);
         expect(response.body.message).toBeDefined();
         expect(response.body.message).toBe("Product not found");
      });

      test("It should return a product", async () => {
         const product = await managerHelper.productManager.create(
            productHelper
         );
        
         const idProduct = product._id;
         const response = await api.delete(`/api/v1/product/${idProduct}`);
         expect(response.statusCode).toBe(204);
         
      });
   
   })
});
