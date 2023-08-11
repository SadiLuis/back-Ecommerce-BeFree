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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passwordHash_1 = require("../../util/passwordHash");
class UserModel {
    constructor() {
        const userSchema = new mongoose_1.Schema({
            username: {
                type: String,
                required: true,
                unique: true,
                trim: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                lowercase: true,
            },
            password: {
                type: String,
                required: false,
                trim: true,
            },
            role: {
                type: String,
                enum: ["admin", "user"],
                default: "user",
            },
            name: {
                type: String,
                required: true,
                trim: true,
            },
            lastname: {
                type: String,
                required: false,
                trim: true,
            },
            phone: {
                type: String,
                required: false,
                trim: true,
            },
            avatar: {
                type: String,
                required: false,
            },
            city: {
                type: String,
                required: false,
            },
            country: {
                type: String,
                required: false,
            },
            address: {
                type: String,
                required: false,
            },
        }, { timestamps: true });
        userSchema.pre("save", function (next) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = this;
                if (!user.isModified("password"))
                    return next();
                user.password = yield (0, passwordHash_1.passwordHash)(user.password);
                next();
            });
        });
        userSchema.methods.comparePassword = function (password) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield bcrypt_1.default.compare(password, this.password);
            });
        };
        this._model = (0, mongoose_1.model)("User", userSchema);
    }
    get getModel() {
        return this._model;
    }
}
const userModel = new UserModel();
exports.default = userModel.getModel;
// const userSchema = new Schema<IUser>(
//     {
//        username: {
//           type: String,
//           required: true,
//           unique: true,
//           trim: true,
//        },
//        email: {
//           type: String,
//           required: true,
//           unique: true,
//           trim: true,
//           lowercase: true,
//        },
//        password: {
//           type: String,
//           required: false,
//           trim: true,
//        },
//        role: {
//           type: String,
//           enum: ["admin", "user"],
//           default: "user",
//        },
//        name: {
//           type: String,
//           required: true,
//           trim: true,
//        },
//        lastname: {
//           type: String,
//           required: false,
//           trim: true,
//        },
//        phone: {
//           type: String,
//           required: false,
//           trim: true,
//        },
//        avatar: {
//           type: String,
//           required: false,
//        },
//        city: {
//           type: String,
//           required: false,
//        },
//        country: {
//           type: String,
//           required: false,
//        },
//        address: {
//           type: String,
//           required: false,
//        },
//     },
//     { timestamps: true }
//  );
//  userSchema.pre<IUser>("save", async function (next) {
//     const user = this;
//     if (!user.isModified("password")) return next();
//     user.password = await passwordHash(user.password);
//     next();
//  });
//  userSchema.methods.comparePassword = async function (
//     password: string
//  ): Promise<boolean> {
//     return await bcrypt.compare(password, this.password);
//  };
//  export default model<IUser>("User", userSchema);
