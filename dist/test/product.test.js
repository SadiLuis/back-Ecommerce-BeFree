"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../App"));
const Database_1 = __importDefault(require("../Database"));
const mongoose_1 = __importStar(require("mongoose"));
const helper_1 = require("./helper/helper");
describe("Test the products route", () => {
    let app;
    let api;
    let DB;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        app = App_1.default.getInstances().getApp();
        DB = Database_1.default.getInstance();
        yield DB.connect();
        api = (0, supertest_1.default)(app);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.managerHelper.productManager.getModel().deleteMany({});
        yield helper_1.managerHelper.categorymanager.getModel().deleteMany({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.managerHelper.productManager.getModel().deleteMany({});
        yield helper_1.managerHelper.categorymanager.getModel().deleteMany({});
        yield mongoose_1.default.disconnect();
    }));
    describe("Test the get products route", () => {
        test("It should return an empty array", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield api.get("/api/v1/products");
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([]);
        }));
        test("It should return an array with one product", () => __awaiter(void 0, void 0, void 0, function* () {
            const testProduct = Object.assign(Object.assign({}, helper_1.productHelper), { category: undefined });
            yield helper_1.managerHelper.productManager.create(testProduct);
            yield helper_1.managerHelper.productManager.create(testProduct);
            const response = yield api.get("/api/v1/products");
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(2);
        }));
    });
    describe("Test the get product route", () => {
        test("It should return a 404 error", () => __awaiter(void 0, void 0, void 0, function* () {
            const idProduct = "618a2d5d0f2b8d0f8b8f9f0c";
            const response = yield api.get(`/api/v1/product/${idProduct}`);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe("Product not found");
        }));
        test("It should return a product", () => __awaiter(void 0, void 0, void 0, function* () {
            const testProduct = Object.assign(Object.assign({}, helper_1.productHelper), { category: undefined });
            const product = yield helper_1.managerHelper.productManager.create(testProduct);
            const idProduct = product._id;
            const response = yield api.get(`/api/v1/product/${idProduct}`);
            expect(response.statusCode).toBe(200);
            expect(response.body._id).toBeDefined();
        }));
    });
    describe("Test the create product route", () => {
        test("It should return a 400 error", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield api.post("/api/v1/product");
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe("All fields are required");
        }));
        test("It should return a 400 error if name is empty", () => __awaiter(void 0, void 0, void 0, function* () {
            const product = Object.assign(Object.assign({}, helper_1.productHelper), { name: "" });
            const response = yield api.post("/api/v1/product").send(product);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe("All fields are required");
        }));
        test("It should return a 400 error if length description smaller than 70", () => __awaiter(void 0, void 0, void 0, function* () {
            const product = Object.assign(Object.assign({}, helper_1.productHelper), { description: "a".repeat(69) });
            const response = yield api.post("/api/v1/product").send(product);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe("Description must be 70 characters or less");
        }));
        test("It should return a product", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield api.post("/api/v1/product").send(helper_1.productHelper);
            expect(response.statusCode).toBe(201);
            expect(response.body._id).toBeDefined();
            expect(response.body.category).toBeDefined();
            expect((0, mongoose_1.isValidObjectId)(response.body.category)).toBeTruthy();
        }));
    });
    describe("Test the update product route", () => {
        test("It should return a 404 error", () => __awaiter(void 0, void 0, void 0, function* () {
            const idProduct = "618a2d5d0f2b8d0f8b8f9f0c";
            const response = yield api
                .put(`/api/v1/product/${idProduct}`)
                .send(helper_1.productHelper);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe("Product not found");
        }));
        test("It should return a product", () => __awaiter(void 0, void 0, void 0, function* () {
            const testProduct = Object.assign(Object.assign({}, helper_1.productHelper), { category: undefined });
            const product = yield helper_1.managerHelper.productManager.create(testProduct);
            const idProduct = product._id;
            const response = yield api
                .put(`/api/v1/product/${idProduct}`)
                .send(helper_1.productHelper);
            expect(response.statusCode).toBe(200);
            expect(response.body._id).toBeDefined();
        }));
    });
    describe("Test the delete product route", () => {
        test("It should return a 404 error", () => __awaiter(void 0, void 0, void 0, function* () {
            const idProduct = "618a2d5d0f2b8d0f8b8f9f0c";
            const response = yield api.delete(`/api/v1/product/${idProduct}`);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe("Product not found");
        }));
        test("It should return a product", () => __awaiter(void 0, void 0, void 0, function* () {
            const testProduct = Object.assign(Object.assign({}, helper_1.productHelper), { category: undefined });
            const product = yield helper_1.managerHelper.productManager.create(testProduct);
            const idProduct = product._id;
            const response = yield api.delete(`/api/v1/product/${idProduct}`);
            expect(response.statusCode).toBe(204);
        }));
    });
});
