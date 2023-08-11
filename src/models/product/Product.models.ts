import { Schema, model, Model } from "mongoose";
import IProduct from "./interfaces/Porduct.interfaces";

class ProductSchema {
   private _model: Model<IProduct>;
   private Schema: Schema;

   constructor() {
      this.Schema = new Schema({
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
            type: Schema.Types.ObjectId,
            ref: "Category",
         },
      }, {timestamps:true});
      this._model = model<IProduct>("Product", this.Schema);
   }

   public get getModel(): Model<IProduct> {
      return this._model;
   }
}

const productSchema = new ProductSchema();

export default productSchema.getModel;
