import { Router } from "express";
import ProductControllers from "../controllers/Product.controllers";

export default class ProductsRouter {
   private static instance: ProductsRouter;
   public router: Router;
   private productControllers: ProductControllers;

    constructor() {
      this.router = Router();
      this.productControllers = ProductControllers.getInstance();
      this.configRoutes();
   }

   private configRoutes  ()  {
      this.router.get("/products", this.productControllers.getAllProducts);
      this.router.get("/product/:idProduct", this.productControllers.getProductById);
      this.router.post("/product", this.productControllers.createProduct);
      this.router.put("/product/:idProduct", this.productControllers.updateProduct);
      this.router.delete("/product/:idProduct", this.productControllers.deleteProduct);
   };

   public getRouter = (): Router => {
      return this.router;
   };

   public static getInstance(): ProductsRouter {
      if (!ProductsRouter.instance) {
         ProductsRouter.instance = new ProductsRouter();
      }
      return ProductsRouter.instance;
   }
}
