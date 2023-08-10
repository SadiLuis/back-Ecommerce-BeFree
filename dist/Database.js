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
const config_1 = __importDefault(require("./config/config"));
class Database {
    constructor() {
        this.database = mongoose_1.default.connection;
        this.connect();
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(config_1.default.DB.URI);
            this.database.on("error", console.error.bind(console, "connection error:"));
            yield new Promise((resolve) => {
                this.database.once("open", () => {
                    console.log("MongoDB database connection established successfully", mongoose_1.default.connection.readyState);
                    resolve();
                });
            });
            return mongoose_1.default.connection;
            // try {
            //    const connection = await mongoose.connect(config.DB.URI);
            //    console.log("MongoDB database connection established successfully");
            //    return connection.connection
            // } catch (error) {
            //    console.error.bind(console, "connection error:");
            // }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.disconnect();
            console.log("MongoDB database connection closed successfully");
        });
    }
}
exports.default = Database;
