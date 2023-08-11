"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ManagerCRUD_1 = __importDefault(require("../../../util/manager/ManagerCRUD"));
const Category_models_1 = __importDefault(require("../Category.models"));
class CategoryManager extends ManagerCRUD_1.default {
    constructor() {
        super(Category_models_1.default);
    }
    static getInstance() {
        if (!CategoryManager.instance) {
            CategoryManager.instance = new CategoryManager();
        }
        return CategoryManager.instance;
    }
}
exports.default = CategoryManager;
