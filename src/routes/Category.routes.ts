import { Router } from "express";
import CategoryController from "../controllers/Category.controllers";

export default class CategoryRouter {
   private static instance: CategoryRouter;
   public router: Router;
   private categoryController: CategoryController;

   constructor() {
      this.router = Router();
      this.categoryController = new CategoryController();
      this.configRoutes();
   }

   private configRoutes() {
      this.router.get("/categories", this.categoryController.getAll);
      this.router.get("/category/:idCategory", this.categoryController.getById);
      this.router.post("/category", this.categoryController.create);
      this.router.put("/category/:id", this.categoryController.update);
      this.router.delete("/category/:id", this.categoryController.delete);
   }

   public  getRouter(): Router {
      return this.router;
   }

   public static getInstance(): CategoryRouter {
      if (!CategoryRouter.instance) {
         CategoryRouter.instance = new CategoryRouter();
      }
      return CategoryRouter.instance;
   }
}
