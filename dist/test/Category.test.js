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
const Database_1 = __importDefault(require("../Database"));
const App_1 = __importDefault(require("../App"));
const helper_1 = require("./helper/helper");
const mongoose_1 = __importStar(require("mongoose"));
describe("test Category", () => {
    let app;
    let db;
    let api;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        app = App_1.default.getInstances().getApp();
        db = Database_1.default.getInstance();
        api = (0, supertest_1.default)(app);
        yield db.connect();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.managerHelper.categorymanager.getModel().deleteMany({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.managerHelper.categorymanager.getModel().deleteMany({});
        yield mongoose_1.default.disconnect();
    }));
    describe("test the get all category", () => {
        test("should return an array of category", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield api.get("/api/v1/categories").expect("Content-Type", /application\/json/);
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(0);
        }));
        test("should return an array of category", () => __awaiter(void 0, void 0, void 0, function* () {
            yield helper_1.managerHelper.categorymanager.create(helper_1.categoryHelper);
            const res = yield api.get("/api/v1/categories").expect("Content-Type", /application\/json/);
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].name).toBe("XXXXXXXXXXXXXX");
        }));
    });
    describe("test the get category by id", () => {
        test("should return an category", () => __awaiter(void 0, void 0, void 0, function* () {
            const category = yield helper_1.managerHelper.categorymanager.create(helper_1.categoryHelper);
            const res = yield api.get(`/api/v1/category/${category._id}`).expect("Content-Type", /application\/json/);
            expect(res.status).toBe(200);
            expect(res.body.name).toBe("XXXXXXXXXXXXXX");
        }));
        test('should return 404 if category not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield api.get(`/api/v1/category/${new mongoose_1.default.Types.ObjectId()}`).expect("Content-Type", /application\/json/);
            expect(res.status).toBe(404);
            expect(res.body.message).toBeDefined();
            expect(res.body.message).toContain("Category not found");
        }));
    });
    describe("test the create category", () => {
        test("should return an category", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield api.post("/api/v1/category").send(helper_1.categoryHelper).expect("Content-Type", /application\/json/);
            expect(res.status).toBe(201);
            expect(res.body._id).toBeDefined();
            expect((0, mongoose_1.isValidObjectId)(res.body._id)).toBeTruthy();
        }));
    });
    describe("test the update category", () => {
        test("should return an category", () => __awaiter(void 0, void 0, void 0, function* () {
            const category = yield helper_1.managerHelper.categorymanager.create(helper_1.categoryHelper);
            const res = yield api.put(`/api/v1/category/${category._id}`).send(helper_1.categoryHelper).expect("Content-Type", /application\/json/);
            expect(res.status).toBe(200);
            expect(res.body.name).toBe("XXXXXXXXXXXXXX");
        }));
    });
    describe("test the delete category", () => {
        test("should return an category", () => __awaiter(void 0, void 0, void 0, function* () {
            const category = yield helper_1.managerHelper.categorymanager.create(helper_1.categoryHelper);
            const res = yield api.delete(`/api/v1/category/${category._id}`);
            expect(res.status).toBe(204);
            //  expect(res.body.name).toBe("XXXXXXXXXXXXXX");
        }));
    });
});
