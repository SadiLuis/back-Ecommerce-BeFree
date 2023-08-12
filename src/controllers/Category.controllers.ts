import { Request, Response } from "express";
import CategoryService from "../services/Category.service";
import { messageError } from "../util/errors/messageError";

export default class CategoryController {
   private categoryService: CategoryService;

   constructor() {
      this.categoryService = CategoryService.getInstance();
   }

   public  getAll= async(req: Request, res: Response)=> {
      try {
         const categories = await this.categoryService.getAllService();
         res.status(200).json(categories);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   }

   public create= async (req: Request, res: Response)=> {
      try {
         const category = await this.categoryService.createService(req.body);
         res.status(201).json(category);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   }

   public update =async (req: Request, res: Response)=> {
      try {
         const category = await this.categoryService.updateService(
            req.params.id,
            req.body
         );
         return res.status(200).json(category);
      } catch (error) {
         return res.status(500).json({ error: error });
      }
   }

   public delete= async (req: Request, res: Response)=> {
      try {
         const category = await this.categoryService.deleteService(req.params.id);
         res.status(204).json(category);
      } catch (error) {
        return res.status(500).json({ error: error });
      }
   }

   public getById= async (req: Request, res: Response):Promise<Response> => {
      const {idCategory} = req.params;
      try {
         const category = await this.categoryService.getByIdService(idCategory);
         if(!category) return res.status(404).json({message: "Category not found"});
        return res.status(200).json(category);
      } catch (error) {
         console.log(error);
        return res.status(500).json({ error: error });
      
      }
   }
}
