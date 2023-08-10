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
const config_1 = __importDefault(require("../../../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ManagerCRUD_1 = __importDefault(require("../../../util/manager/ManagerCRUD"));
const User_models_1 = __importDefault(require("../User.models"));
class UserManager extends ManagerCRUD_1.default {
    // private readonly user : UserModels = new UserModels();
    constructor() {
        super(User_models_1.default);
        this.getByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getModel().findOne({ email: email });
            }
            catch (error) {
                throw error;
            }
        });
    }
    createToken(user) {
        return jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role.roleName }, config_1.default.jwtSecret, {
            expiresIn: 3600,
        });
    }
    static getInstance() {
        if (!UserManager.instances) {
            UserManager.instances = new UserManager();
        }
        return UserManager.instances;
    }
}
exports.default = UserManager;
