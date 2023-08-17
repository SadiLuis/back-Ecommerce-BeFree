"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class ProductSchema {
    constructor() {
        this.Schema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                required: true,
                minlength: 70,
            },
            image: [
                {
                    type: String,
                    required: false,
                    trim: true,
                },
            ],
            price: {
                type: Number,
                required: true,
            },
            stock: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
            size: {
                type: String,
                required: false,
            },
            statusProduct: {
                type: Boolean,
                required: false,
                default: true,
            },
            category: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Category",
            },
        }, { timestamps: true });
        this._model = (0, mongoose_1.model)("Product", this.Schema);
    }
    get getModel() {
        return this._model;
    }
}
const productSchema = new ProductSchema();
exports.default = productSchema.getModel;
