import ProductManager from "../models/product/manager/Product.manager";
import IProduct from "../models/product/interfaces/Porduct.interfaces";
import ProductDTO from "../models/product/DTO/Product.DTO";
import { messageError } from "../util/errors/messageError";
import StatusError from "../util/interfaces/StatusError.interfaces";

export default class ProductServices {
   private static instance: ProductServices;
   private productManager: ProductManager;

   private constructor() {
      this.productManager = ProductManager.getInstance();
   }

   public listService = async (): Promise<IProduct[]> => {
      try {
         const allProducts: IProduct[] = await this.productManager.getAll();
         return allProducts;
      } catch (error) {
         console.log(messageError(error));
         throw error;
      }
   };

   public byIdService = async (
      idProduct: string
   ): Promise<IProduct | StatusError> => {
      try {
         const product: IProduct = await this.productManager.getById(idProduct);
         if (!product) return { status: 404, message: "Product not found" };

         return product;
      } catch (error) {
         throw error;
      }
   };

   public createService = async (product: ProductDTO): Promise<IProduct> => {
      try {
         const newProduct: IProduct = await this.productManager.create(product);

         return newProduct;
      } catch (error) {
         throw error;
      }
   };

   public updateService = async (idProduc: string, newProduct: ProductDTO) => {
      try {
         const updateProduct: IProduct = await this.productManager.update(
            idProduc,
            newProduct
         );
         if (!updateProduct)
            return { status: 404, message: "Product not found" };
         return updateProduct;
      } catch (error) {
         throw error;
      }
   };

   public deleteService = async (
      idProduct: string
   ): Promise<IProduct | StatusError> => {
      try {
         const deleteProduct: IProduct | null =
            await this.productManager.delete(idProduct);
         // console.log(deleteProduct);
         if (!deleteProduct)
            return { status: 404, message: "Product not found" };

         return deleteProduct;
      } catch (error) {
         throw error;
      }
   };

   public static getInstance = (): ProductServices => {
      if (!ProductServices.instance) {
         ProductServices.instance = new ProductServices();
      }
      return ProductServices.instance;
   };
}
