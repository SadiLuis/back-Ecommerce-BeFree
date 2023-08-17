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
const UserManager_1 = __importDefault(require("../models/users/manager/UserManager"));
class UserService {
    constructor() {
        this.getAllService = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const allUser = yield this.userManager.getAll();
                return allUser;
            }
            catch (error) {
                throw error;
            }
        });
        this.getByIdService = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userManager.getById(id);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
        this.createService = (user) => __awaiter(this, void 0, void 0, function* () {
            const { email, username, password, name, confirPassword } = user;
            const userExists = yield this.userManager.getByEmail(email);
            if (userExists) {
                return { status: 409, message: "The user already exists" };
            }
            try {
                const newUser = yield this.userManager.create(user);
                return newUser;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
        this.loginService = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userManager.getByEmail(email);
                if (user === null) {
                    return { status: 404, message: "The email does not valid" };
                }
                const isMatch = yield user.comparePassword(password);
                if (!isMatch) {
                    return { status: 401, message: "The password does not valid" };
                }
                return { token: this.userManager.createToken(user) };
            }
            catch (error) {
                throw error;
            }
        });
        this.userManager = UserManager_1.default.getInstance();
    }
}
UserService.getInstance = () => {
    if (!UserService.instance) {
        UserService.instance = new UserService();
    }
    return UserService.instance;
};
exports.default = UserService;
