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
const Product_service_1 = __importDefault(require("../services/Product.service"));
const const_1 = require("../util/const/const");
const Product_build_1 = __importDefault(require("../models/product/build/Product.build"));
class ProductControllers {
    constructor() {
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productServices.listService();
                return res.status(200).json(products);
            }
            catch (error) {
                console.log(error);
                return res.status(400).json(error);
            }
        });
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idProduct } = req.params;
            try {
                const product = yield this.productServices.byIdService(idProduct);
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                return res.status(200).json(product);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
        });
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, price, stock, description, category } = req.body;
            if (!name || !price || !stock || !description || !category) {
                return res.status(400).json({ message: "All fields are required" });
            }
            if (description.length < const_1.LENGTH_DESCRIPTION) {
                return res
                    .status(400)
                    .json({ message: "Description must be 70 characters or less" });
            }
            const newProduct = this.productBuild
                .withName(name)
                .withPrice(price)
                .withStock(stock)
                .withDescription(description)
                .build();
            try {
                const product = yield this.productServices.createService(newProduct, category);
                return res.status(201).json(product);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idProduct } = req.params;
            const { name, price, stock, description, size, image } = req.body;
            if (description.length < const_1.LENGTH_DESCRIPTION) {
                return res
                    .status(400)
                    .json({ message: "Description must be 70 characters or less" });
            }
            const updateProduct = this.productBuild
                .withName(name)
                .withPrice(price)
                .withStock(stock)
                .withDescription(description)
                .withSize(size)
                .withImage(image)
                .build();
            try {
                const product = yield this.productServices.updateService(idProduct, updateProduct);
                if ("status" in product) {
                    return res
                        .status(product["status"])
                        .json({ message: product["message"] });
                }
                return res.status(200).json(product);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idProduct } = req.params;
            try {
                const productDeleted = yield this.productServices.deleteService(idProduct);
                if (!productDeleted) {
                    return res.status(404).json({ message: "Product not found" });
                }
                return res.status(204).json(productDeleted);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
        this.productServices = Product_service_1.default.getInstance();
        this.productBuild = new Product_build_1.default();
    }
    static getInstance() {
        if (!ProductControllers.instance) {
            ProductControllers.instance = new ProductControllers();
        }
        return ProductControllers.instance;
    }
}
exports.default = ProductControllers;
