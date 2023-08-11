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
const Category_service_1 = __importDefault(require("../services/Category.service"));
const messageError_1 = require("../util/errors/messageError");
class CategoryController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.categoryService.getAll();
                res.status(200).json(categories);
            }
            catch (error) {
                return res.status(500).json({ error: (0, messageError_1.messageError)(error) });
            }
        });
        this.categoryService = Category_service_1.default.getInstance();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.categoryService.create(req.body);
                res.status(201).json(category);
            }
            catch (error) {
                return res.status(500).json({ error: (0, messageError_1.messageError)(error) });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.categoryService.update(req.params.id, req.body);
                return res.status(200).json(category);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.categoryService.delete(req.params.id);
                res.status(204).json(category);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.categoryService.getById(req.params.id);
                res.status(200).json(category);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
}
exports.default = CategoryController;
