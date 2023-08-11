import { Document, Model } from "mongoose";
import ICRUD  from "../interfaces/CRUD.Interfaces";

export default class CRUDManager<T extends Document> implements ICRUD<T> {
   protected model: any;

   constructor(model: Model<T>) {
      this.model = model;
   }

   async getAll(): Promise<T[] | any> {
      try {
         return await this.model.find().exec();
      } catch (err) {
         console.log(err);
         
         throw err;
      }
   }

   async getById(id: string): Promise<T> {
      try {
         const entityGet = await this.model.findById(id).exec();

         return entityGet;
      } catch (error) {
         throw error;
      }
   }

   async create(obj: any): Promise<T> {
      try {
         const entityCreate = await this.model.create(obj);

         return entityCreate;
      } catch (error) {
         throw error;
      }
   }

   async update(id: string, obj: any): Promise<T> {
      try {
         const entityUpdate = await this.model
            .findByIdAndUpdate({ _id: id }, obj, { new: true })
            .exec();

         return entityUpdate;
      } catch (error) {
         throw error;
      }
   }

   public async delete(id: string): Promise<T | null> {
      try {
         const entityDelete = await this.model
            .findOneAndDelete({ _id: id })
            .exec();
         return entityDelete;
      } catch (error) {
         throw error;
      }
   }
   

   public getModel(): Model<T> {
      return this.model;
   }
}
