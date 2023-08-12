import { ObjectId } from "mongoose";
import IProduct from "../interfaces/Porduct.interfaces";

export default class ProducyBuild {
   private Product: IProduct = {} as IProduct;

   constructor() {}

   withName(name: string): ProducyBuild {
      this.Product.name = name;
      return this;
   }

   withPrice(price: number): ProducyBuild {
      this.Product.price = price;
      return this;
   }

   withStock(stock: number): ProducyBuild {
      this.Product.stock = stock;
      return this;
   }

   withImage(image: string[]): ProducyBuild {
      if (this.Product.image) {
         this.Product.image=image;
      }
      return this;
   }

   withCategory(category: ObjectId): ProducyBuild {
      this.Product.category = category;
      return this;
   }

   withDescription(description: string): ProducyBuild {
      this.Product.description = description;
      return this;
   }

   withSize(size: string | undefined): ProducyBuild {
      this.Product.size = size;
      return this;
   }

   build(): IProduct {
      return this.Product;
   }
}
