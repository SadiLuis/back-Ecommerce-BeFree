import { Schema, model, Model } from "mongoose";
import ICategory from "./interfaces/Category.interfaces";

class CategoryModels {
   private _model: Model<ICategory>;
   private categorySchema: Schema<ICategory>;

   constructor() {
      this.categorySchema = new Schema<ICategory>({
         name: {
            type: String,
            required: true,
            unique: true,
         },
      });

      this._model = model<ICategory>("Category", this.categorySchema);
   }

   public get getModel(): Model<ICategory> {
    return this._model;
   }
}

const categoryModels = new CategoryModels();
export default categoryModels.getModel;
