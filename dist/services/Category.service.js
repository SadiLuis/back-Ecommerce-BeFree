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
const Category_manager_1 = __importDefault(require("../models/category/manager/Category.manager"));
class CategoryService {
    constructor() {
        this.categoryManager = Category_manager_1.default.getInstance();
    }
    create(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryManager.create(category);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryManager.getAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryManager.getById(id);
        });
    }
    update(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryManager.update(id, category);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryManager.delete(id);
        });
    }
    static getInstance() {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService();
        }
        return CategoryService.instance;
    }
}
exports.default = CategoryService;
