import { Request, Response } from "express";
import ProductServices from "../services/Product.service";
import { messageError } from "../util/errors/messageError";
import ProductDTO from "../models/product/DTO/Product.DTO";
import IProduct from "../models/product/interfaces/Porduct.interfaces";
import { LENGTH_DESCRIPTION } from "../util/const/const";
import ProducyBuild from "../models/product/build/Product.build";

export default class ProductControllers {
   private static instance: ProductControllers;
   private productServices: ProductServices;
   private productBuild: ProducyBuild;
   private constructor() {
      this.productServices = ProductServices.getInstance();
      this.productBuild = new ProducyBuild();
   }

   public getAllProducts = async (req: Request, res: Response) => {
      try {
         const products = await this.productServices.listService();
         return res.status(200).json(products);
      } catch (error) {
         console.log(error);
         return res.status(400).json(error);
      }
   };

   public getProductById = async (req: Request, res: Response) => {
      const { idProduct } = req.params;
      try {
         const product = await this.productServices.byIdService(idProduct);

         if (!product) {
            return res.status(404).json({ message: "Product not found" });
         }

         return res.status(200).json(product);
      } catch (error) {
         console.log(error);
         return res.status(500).json(error);
      }
   };

   public createProduct = async (req: Request, res: Response) => {
      const { name, price, stock, description, category }: ProductDTO =
         req.body;
      if (!name || !price || !stock || !description || !category) {
         return res.status(400).json({ message: "All fields are required" });
      }


      if (description.length < LENGTH_DESCRIPTION) {
         return res
            .status(400)
            .json({ message: "Description must be 70 characters or less" });
      }

      const newProduct: IProduct | ProductDTO = this.productBuild
         .withName(name)
         .withPrice(price)
         .withStock(stock)
         .withDescription(description)
         .build();

      try {
         const product: IProduct = await this.productServices.createService(
            newProduct,
            category as string
         );
         return res.status(201).json(product);
      } catch (error) {
         console.log(error);
         return res.status(500).json(error);
      }
   };

   public updateProduct = async (req: Request, res: Response) => {
      const { idProduct } = req.params;
      const { name, price, stock, description, size, image }: ProductDTO =
         req.body;
      if (description.length < LENGTH_DESCRIPTION) {
         return res
            .status(400)
            .json({ message: "Description must be 70 characters or less" });
      }
      const updateProduct: ProductDTO | IProduct = this.productBuild
         .withName(name)
         .withPrice(price)
         .withStock(stock)
         .withDescription(description)
         .withSize(size)
         .withImage(image as string[])
         .build();
      try {
         const product = await this.productServices.updateService(
            idProduct,
            updateProduct
         );
         if ("status" in product) {
            return res
               .status(product["status"])
               .json({ message: product["message"] });
         }

         return res.status(200).json(product);
      } catch (error) {
         return res.status(500).json(error);
      }
   };

   public deleteProduct = async (req: Request, res: Response) => {
      const { idProduct } = req.params;
      try {
         const productDeleted = await this.productServices.deleteService(
            idProduct
         );

         if (!productDeleted) {
            return res.status(404).json({ message: "Product not found" });
         }

         return res.status(204).json(productDeleted);
      } catch (error) {
         return res.status(500).json(error);
      }
   };

   public static getInstance(): ProductControllers {
      if (!ProductControllers.instance) {
         ProductControllers.instance = new ProductControllers();
      }
      return ProductControllers.instance;
   }
}
