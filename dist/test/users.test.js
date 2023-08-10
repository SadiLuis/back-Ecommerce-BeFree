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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../App"));
const Database_1 = __importDefault(require("../Database"));
const helper_1 = require("./helper/helper");
describe("Test", () => {
    let app;
    let db;
    let a;
    let connet;
    let api;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        app = App_1.default.getInstances();
        a = app.getApp();
        db = Database_1.default.getInstance();
        connet = yield db.connect();
        api = (0, supertest_1.default)(a);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.managerHelper.userManagerhelper.getModel().deleteMany({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.db.dropDatabase();
        yield mongoose_1.default.disconnect();
    }));
    describe("test user Controller", () => {
        test("get all users", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield api
                .get("/api/v1/users")
                .expect(200)
                .expect("Content-Type", /json/);
            expect(response.body).toBeDefined();
            expect(Array.isArray(response.body)).toBeTruthy();
        }));
        describe("get user by id", () => {
            test("user not found", () => __awaiter(void 0, void 0, void 0, function* () {
                const idUser = "618a2d5d0f2b8d0f8b8f9f0c";
                const response = yield api
                    .get(`/api/v1/user/${idUser}`)
                    .expect(404)
                    .expect("Content-Type", /application\/json/);
                expect(response.body).toBeDefined();
                expect(response.body.message).toBeDefined();
                expect(response.body.message).toContain("User not found");
            }));
            test("user found", () => __awaiter(void 0, void 0, void 0, function* () {
                const user = {
                    email: "XXXXXXXXXXXXXX",
                    password: "XXXXXXXXXXXXXX",
                    name: "XXXXXXXXXXXXXX",
                    username: "XXXXXXXXXXXXXX",
                };
                const userMock = yield helper_1.managerHelper.userManagerhelper.create(user);
                const response = yield api
                    .get(`/api/v1/user/${userMock._id}`)
                    .expect(200)
                    .expect("Content-Type", /application\/json/);
                expect(response.body).toBeDefined();
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body._id).toBeDefined();
                // expect(response.body.message).toContain("User found")
            }));
        });
        describe("create user", () => {
            test("filds are required", () => __awaiter(void 0, void 0, void 0, function* () {
                const user = {
                    email: "",
                    password: "",
                    name: "",
                    username: "",
                };
                const response = yield api
                    .post("/api/v1/signUp")
                    .send(user)
                    .expect(400)
                    .expect("Content-Type", /application\/json/);
                expect(response.body).toBeDefined();
                expect(response.body.message).toBeDefined();
                expect(response.body.message).toContain("Please, send all the fields");
            }));
            test("all fields are required", () => __awaiter(void 0, void 0, void 0, function* () {
                const user = {
                    email: "XXXXXXXXXXXXXX",
                    password: "XXXXXXXXXXXXXX",
                    name: "",
                    username: "XXXXXXXXXXXXXX",
                };
                const response = yield api
                    .post("/api/v1/signUp")
                    .send(user)
                    .expect(400)
                    .expect("Content-Type", /application\/json/);
                expect(response.body).toBeDefined();
                expect(response.body.message).toBeDefined();
                expect(response.body.message).toContain("Please, send all the fields");
            }));
            test("password not match", () => __awaiter(void 0, void 0, void 0, function* () {
                const userHelperTemp = Object.assign(Object.assign({}, helper_1.userHelper), { password: "ZZZZZZZ" });
                const response = yield api
                    .post("/api/v1/signUp")
                    .send(userHelperTemp)
                    .expect(400)
                    .expect("Content-Type", /application\/json/);
                expect(response.body).toBeDefined();
                expect(response.body.message).toBeDefined();
                expect(response.body.message).toContain("The passwords do not match");
            }));
            test("email is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
                const user = {
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
                yield helper_1.managerHelper.userManagerhelper.create(user);
                const response = yield api
                    .post("/api/v1/signUp")
                    .send(helper_1.userHelper)
                    .expect(409)
                    .expect("Content-Type", /application\/json/);
                expect(response.body).toBeDefined();
                expect(response.body.message).toBeDefined();
                expect(response.body.message).toContain("The user already exists");
            }));
            test("user created", () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield api
                    .post("/api/v1/signUp")
                    .send(helper_1.userHelper)
                    .expect(201)
                    .expect("Content-Type", /application\/json/);
                expect(response.body).toBeDefined();
                expect(response.body._id).toBeDefined();
                expect(response.body.email).toBeDefined();
                expect(response.body.role).toBeDefined();
            }));
        });
        describe("login user", () => {
            test("filds are required", () => __awaiter(void 0, void 0, void 0, function* () {
                const user = {
                    email: "",
                    password: "",
                };
                const response = yield api
                    .post("/api/v1/signIn")
                    .send(user)
                    .expect(400)
                    .expect("Content-Type", /application\/json/);
                expect(response.body).toBeDefined();
                expect(response.body.message).toBeDefined();
                expect(response.body.message).toContain("Please, send all the fields");
            }));
            test("all fields are required", () => __awaiter(void 0, void 0, void 0, function* () {
                const user = {
                    email: "XXXXXXXXXXXXXX",
                    password: "",
                };
            }));
            test("user not found", () => __awaiter(void 0, void 0, void 0, function* () {
                const user = {
                    email: "XXXXXXXXXXXXXX",
                    password: "XXXXXXXXXXXXXX",
                };
                const response = yield api
                    .post("/api/v1/signIn")
                    .send(user)
                    .expect(404)
                    .expect("Content-Type", /application\/json/);
                expect(response.body).toBeDefined();
                expect(response.body.message).toBeDefined();
                expect(response.body.message).toContain("The email does not valid");
            }));
            test("password not match", () => __awaiter(void 0, void 0, void 0, function* () {
                const user = {
                    email: "XXXXXXXXXXXXXX",
                    password: "ZZZZZZ",
                    username: "XXXXXXXXXXXXXX",
                    name: "XXXXXXXXXXXXXX",
                };
                yield helper_1.managerHelper.userManagerhelper.create(user);
                const response = yield api
                    .post("/api/v1/signIn")
                    .send(helper_1.userHelper)
                    .expect(401)
                    .expect("Content-Type", /application\/json/);
                expect(response.body).toBeDefined();
                expect(response.body.message).toBeDefined();
                expect(response.body.message).toContain("The password does not valid");
            }));
            test("user login", () => __awaiter(void 0, void 0, void 0, function* () {
                yield helper_1.managerHelper.userManagerhelper.create({
                    email: helper_1.userHelper.email,
                    password: helper_1.userHelper.password,
                    username: helper_1.userHelper.username,
                    name: helper_1.userHelper.name,
                });
                const response = yield api
                    .post("/api/v1/signIn")
                    .send({
                    email: helper_1.userHelper.email,
                    password: helper_1.userHelper.password,
                })
                    .expect(200)
                    .expect("Content-Type", /application\/json/);
                expect(response.body).toBeDefined();
                expect(response.body.token).toBeDefined();
            }));
        });
    });
});
