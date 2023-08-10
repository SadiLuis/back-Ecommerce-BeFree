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
Object.defineProperty(exports, "__esModule", { value: true });
class ManagerDB {
    constructor(model) {
        this.model = model;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find().exec();
            }
            catch (err) {
                throw err;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entityGet = yield this.model.findById(id).exec();
                return entityGet;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entityCreate = yield this.model.create(obj);
                return entityCreate;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entityUpdate = yield this.model
                    .findByIdAndUpdate({ _id: id }, obj, { new: true })
                    .exec();
                return entityUpdate;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entityDelete = yield this.model
                    .findOneAndDelete({ _id: id })
                    .exec();
                return entityDelete;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getModel() {
        return this.model;
    }
}
exports.default = ManagerDB;
