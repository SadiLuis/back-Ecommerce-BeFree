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
const App_1 = __importDefault(require("../App"));
const supertest_1 = __importDefault(require("supertest"));
const Database_1 = __importDefault(require("../Database"));
// import passport from "passport";
// import passportMiddlewar from "../utils/middleware/passport";
const mongoose_1 = __importDefault(require("mongoose"));
describe("Test", () => {
    let app;
    let server;
    let db;
    let a;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        app = App_1.default.getInstances();
        ;
        db = Database_1.default.getInstance();
        a = app.getApp();
        server = app.getApp();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }));
    // Resto de tus tests aquí...
    it("test_server_starts_and_listens_on_specified_port", () => {
        console.log(server);
        expect(server).toBeDefined();
    });
    it("test_swagger_documentation_is_properly_served", () => __awaiter(void 0, void 0, void 0, function* () {
        const agent = supertest_1.default.agent(app.getApp());
        yield agent.get("/").expect(200);
    }));
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
