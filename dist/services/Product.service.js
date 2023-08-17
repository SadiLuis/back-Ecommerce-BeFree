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
const Product_manager_1 = __importDefault(require("../models/product/manager/Product.manager"));
const messageError_1 = require("../util/errors/messageError");
const Category_manager_1 = __importDefault(require("../models/category/manager/Category.manager"));
class ProductServices {
    constructor() {
        this.listService = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const allProducts = yield this.productManager.getAll();
                return allProducts;
            }
            catch (error) {
                console.log((0, messageError_1.messageError)(error));
                throw error;
            }
        });
        this.byIdService = (idProduct) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productManager.getById(idProduct);
                return product;
            }
            catch (error) {
                throw error;
            }
        });
        this.createService = (product, nameCategoy) => __awaiter(this, void 0, void 0, function* () {
            try {
                let category = yield this.categoryManager.getByName(nameCategoy);
                if (!category) {
                    category = yield this.categoryManager.create({ name: nameCategoy });
                }
                product.category = category._id;
                const newProduct = yield this.productManager.create(product);
                return newProduct;
            }
            catch (error) {
                throw error;
            }
        });
        this.updateService = (idProduc, newProduct) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateProduct = yield this.productManager.update(idProduc, newProduct);
                if (!updateProduct)
                    return { status: 404, message: "Product not found" };
                return updateProduct;
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteService = (idProduct) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteProduct = yield this.productManager.delete(idProduct);
                return deleteProduct;
            }
            catch (error) {
                throw error;
            }
        });
        this.productManager = Product_manager_1.default.getInstance();
        this.categoryManager = Category_manager_1.default.getInstance();
    }
}
ProductServices.getInstance = () => {
    if (!ProductServices.instance) {
        ProductServices.instance = new ProductServices();
    }
    return ProductServices.instance;
};
exports.default = ProductServices;
