"use strict";
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
const mongoose_1 = __importDefault(require("mongoose"));
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
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.managerHelper.productManager.getModel().deleteMany({});
        yield mongoose_1.default.disconnect();
    }));
    describe("Test the get products route", () => {
        test("It should return an empty array", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield api.get("/api/products");
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([]);
        }));
        test("It should return an array with one product", () => __awaiter(void 0, void 0, void 0, function* () {
            yield helper_1.managerHelper.productManager.create(helper_1.productHelper);
            yield helper_1.managerHelper.productManager.create(helper_1.productHelper);
            const response = yield api.get("/api/products");
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(2);
        }));
    });
    describe("Test the get product route", () => {
        test("It should return a 404 error", () => __awaiter(void 0, void 0, void 0, function* () {
            const idProduct = "618a2d5d0f2b8d0f8b8f9f0c";
            const response = yield api.get(`/api/products/${idProduct}`);
            console.log(response.body);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe("Product not found");
        }));
        test("It should return a product", () => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield helper_1.managerHelper.productManager.create(helper_1.productHelper);
            const response = yield api.get(`/api/products/${product._id}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(product);
        }));
    });
});
