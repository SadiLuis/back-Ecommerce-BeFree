"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Category_controllers_1 = __importDefault(require("../controllers/Category.controllers"));
class CategoryRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.categoryController = new Category_controllers_1.default();
        this.configRoutes();
    }
    configRoutes() {
        this.router.get("/categories", this.categoryController.getAll);
        this.router.get("/category/:idCategory", this.categoryController.getById);
        this.router.post("/category", this.categoryController.create);
        this.router.put("/category/:id", this.categoryController.update);
        this.router.delete("/category/:id", this.categoryController.delete);
    }
    getRouter() {
        return this.router;
    }
    static getInstance() {
        if (!CategoryRouter.instance) {
            CategoryRouter.instance = new CategoryRouter();
        }
        return CategoryRouter.instance;
    }
}
exports.default = CategoryRouter;
