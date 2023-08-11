"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_controllers_1 = __importDefault(require("../controllers/Product.controllers"));
class ProductsRouter {
    constructor() {
        this.getRouter = () => {
            return this.router;
        };
        this.router = (0, express_1.Router)();
        this.productControllers = Product_controllers_1.default.getInstance();
        this.configRoutes();
    }
    configRoutes() {
        this.router.get("/products", this.productControllers.getAllProducts);
        this.router.get("/product/:idProduct", this.productControllers.getProductById);
    }
    ;
    static getInstance() {
        if (!ProductsRouter.instance) {
            ProductsRouter.instance = new ProductsRouter();
        }
        return ProductsRouter.instance;
    }
}
exports.default = ProductsRouter;
