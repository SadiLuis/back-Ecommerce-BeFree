"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_controllers_1 = __importDefault(require("../controllers/Users.controllers"));
const Auth_controllers_1 = __importDefault(require("../controllers/Auth.controllers"));
class UserRoutes {
    constructor() {
        this.configRouters = () => {
            this.routes.get('/users', this.userController.getUsers);
            this.routes.get('/user/:idUser', this.userController.getUserById);
            this.routes.post('/signUp', this.authController.signUp);
            this.routes.post("/signIn", this.authController.signIn);
            // this.routes.put('/user/:id', this.userController.updateUser)
        };
        this.routes = (0, express_1.Router)();
        this.userController = Users_controllers_1.default.getInstance();
        this.authController = Auth_controllers_1.default.getInstance();
        this.configRouters();
    }
    getRouter() {
        return this.routes;
    }
    static getInstance() {
        if (!UserRoutes.instance) {
            UserRoutes.instance = new UserRoutes();
        }
        return UserRoutes.instance;
    }
}
exports.default = UserRoutes;
