"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class CategoryModels {
    constructor() {
        this.categorySchema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true,
                unique: true,
            },
        });
        this._model = (0, mongoose_1.model)("Category", this.categorySchema);
    }
    get getModel() {
        return this._model;
    }
}
const categoryModels = new CategoryModels();
exports.default = categoryModels.getModel;
