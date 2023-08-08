"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const config_1 = __importDefault(require("./config/config"));
class Server {
    constructor() {
        this.app = App_1.default.getInstances();
    }
    start() {
        const port = config_1.default.port;
        const server = this.app.getApp().listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
        return server;
    }
    stop() {
        return this.app.getApp().off;
    }
    static getInstance() {
        if (!Server.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    }
}
exports.default = Server;
