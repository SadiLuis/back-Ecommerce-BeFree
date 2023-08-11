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
const Product_mager_1 = __importDefault(require("../models/product/manager/Product.mager"));
const messageError_1 = require("../util/errors/messageError");
class ProductServices {
    constructor() {
        this.listProduct = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const allProducts = yield this.productManager.getAll();
                return allProducts;
            }
            catch (error) {
                console.log((0, messageError_1.messageError)(error));
                throw error;
            }
        });
        this.oneProduct = (idProduct) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productManager.getById(idProduct);
                if (!product)
                    return { status: 404, message: "Product not found" };
                return product;
            }
            catch (error) {
                throw error;
            }
        });
        this.productManager = Product_mager_1.default.getInstance();
    }
}
ProductServices.getInstance = () => {
    if (!ProductServices.instance) {
        ProductServices.instance = new ProductServices();
    }
    return ProductServices.instance;
};
exports.default = ProductServices;
