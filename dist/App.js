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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const Database_1 = __importDefault(require("./Database"));
const Users_routes_1 = __importDefault(require("./routes/Users.routes"));
const Category_routes_1 = __importDefault(require("./routes/Category.routes"));
const Product_routes_1 = __importDefault(require("./routes/Product.routes"));
class App {
    constructor() {
        this.corsOptions = {
            origin: "*",
            optionsSuccessStatus: 200,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        };
        this.routes = () => {
            this.app.get("/", (req, res) => {
                return res.send("Hello World").status(200);
            });
            this.app.use("/api/v1", this.userRoutes.getRouter());
            this.app.use("/api/v1", this.categoryRoutes.getRouter());
            this.app.use("/api", this.productRoutes.getRouter());
        };
        this.app = (0, express_1.default)();
        this.database = Database_1.default.getInstance();
        this.userRoutes = new Users_routes_1.default();
        this.categoryRoutes = new Category_routes_1.default();
        this.productRoutes = new Product_routes_1.default();
        this.middlewares();
        this.databaseConnection();
        this.routes();
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)(this.corsOptions));
        this.app.use((0, morgan_1.default)("dev"));
    }
    databaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const prueba = yield this.database.connect();
            return prueba;
        });
    }
    getApp() {
        return this.app;
    }
    static getInstances() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }
}
exports.default = App;
