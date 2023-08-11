"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productHelper = exports.userHelper = exports.managerHelper = void 0;
const Product_mager_1 = __importDefault(require("../../models/product/manager/Product.mager"));
const UserManager_1 = __importDefault(require("../../models/users/manager/UserManager"));
const managerHelper = {
    userManagerhelper: UserManager_1.default.getInstance(),
    productManager: Product_mager_1.default.getInstance()
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
    title: "XXXXXXXXXXXXXX",
    description: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  XXXXXXXXXXXXXX XXXXXXXXXXXXXX",
    price: 9999,
    quantity: 1,
};
exports.productHelper = productHelper;
