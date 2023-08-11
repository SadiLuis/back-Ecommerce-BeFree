"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ManagerCRUD_1 = __importDefault(require("../../../util/manager/ManagerCRUD"));
const Product_models_1 = __importDefault(require("../Product.models"));
class ProductManager extends ManagerCRUD_1.default {
    constructor() {
        super(Product_models_1.default);
    }
    static getInstance() {
        if (!ProductManager.instance) {
            ProductManager.instance = new ProductManager();
        }
        return ProductManager.instance;
    }
}
exports.default = ProductManager;
