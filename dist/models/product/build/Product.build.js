"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProducyBuild {
    constructor() {
        this.Product = {};
    }
    withName(name) {
        this.Product.name = name;
        return this;
    }
    withPrice(price) {
        this.Product.price = price;
        return this;
    }
    withStock(stock) {
        this.Product.stock = stock;
        return this;
    }
    withImage(image) {
        if (this.Product.image) {
            this.Product.image = image;
        }
        return this;
    }
    withCategory(category) {
        this.Product.category = category;
        return this;
    }
    withDescription(description) {
        this.Product.description = description;
        return this;
    }
    withSize(size) {
        this.Product.size = size;
        return this;
    }
    build() {
        return this.Product;
    }
}
exports.default = ProducyBuild;
