import ProductManager from "../models/product/manager/Product.manager";
import IProduct from "../models/product/interfaces/Porduct.interfaces";
import ProductDTO from "../models/product/DTO/Product.DTO";
import { messageError } from "../util/errors/messageError";
import StatusError from "../util/interfaces/StatusError.interfaces";
import CategoryManager from "../models/category/manager/Category.manager";
import ICategory from "../models/category/interfaces/Category.interfaces";

export default class ProductServices {
   private static instance: ProductServices;
   private productManager: ProductManager;
   private categoryManager: CategoryManager
   

   private constructor() {
      this.productManager = ProductManager.getInstance();
      this.categoryManager = CategoryManager.getInstance();
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
   ): Promise<IProduct > => {
      try {
         const product: IProduct = await this.productManager.getById(idProduct);
      

         return product;
      } catch (error) {
         throw error;
      }
   };

   public createService = async (product: IProduct, nameCategoy: string): Promise<IProduct> => {
      try {
         
         let category: ICategory = await this.categoryManager.getByName(nameCategoy)
         if(!category){
             category = await this.categoryManager.create({name: nameCategoy})         
         }
         
         product.category = category._id

         const newProduct: IProduct = await this.productManager.create(product);

         return newProduct;
      } catch (error) {
         throw error;
      }
   };

   public updateService = async (idProduc: string, newProduct: ProductDTO | IProduct) => {
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
   ): Promise<IProduct | null> => {
      try {
         const deleteProduct: IProduct | null =
            await this.productManager.delete(idProduct);
         

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
