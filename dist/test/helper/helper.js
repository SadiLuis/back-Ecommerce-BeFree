"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerHelper = exports.userHelper = void 0;
const UserManager_1 = __importDefault(require("../../models/users/manager/UserManager"));
const managerHelper = {
    userManagerhelper: UserManager_1.default.getInstance()
};
exports.managerHelper = managerHelper;
exports.userHelper = {
    email: "XXXXXXXXXXXXXX",
    password: "XXXXXXXXXXXXXX",
    username: "XXXXXXXXXXXXXX",
    confirPassword: "XXXXXXXXXXXXXX",
    name: "XXXXXXXXXXXXXX",
};
