"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryHelper = exports.productHelper = exports.userHelper = exports.managerHelper = void 0;
const Category_manager_1 = __importDefault(require("../../models/category/manager/Category.manager"));
const Product_manager_1 = __importDefault(require("../../models/product/manager/Product.manager"));
const UserManager_1 = __importDefault(require("../../models/users/manager/UserManager"));
const managerHelper = {
    userManagerhelper: UserManager_1.default.getInstance(),
    productManager: Product_manager_1.default.getInstance(),
    categorymanager: Category_manager_1.default.getInstance()
};
exports.managerHelper = managerHelper;
const userHelper = {
    email: "XXXXXXXXXXXXXX",
    password: "XXXXXXXXXXXXXX",
    username: "XXXXXXXXXXXXXX",
    confirPassword: "XXXXXXXXXXXXXX",
    name: "XXXXXXXXXXXXXX",
};
exports.userHelper = userHelper;
const productHelper = {
    name: "XXXXXXXXXXXXXX",
    description: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  XXXXXXXXXXXXXX XXXXXXXXXXXXXX",
    price: 9999,
    stock: 1,
    category: "XXXXXXXXXXXXXX"
};
exports.productHelper = productHelper;
const categoryHelper = {
    name: "XXXXXXXXXXXXXX",
};
exports.categoryHelper = categoryHelper;
