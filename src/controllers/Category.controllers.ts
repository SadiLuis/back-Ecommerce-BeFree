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
         const categories = await this.categoryService.getAll();
         res.status(200).json(categories);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   }

   public async create(req: Request, res: Response) {
      try {
         const category = await this.categoryService.create(req.body);
         res.status(201).json(category);
      } catch (error) {
         return res.status(500).json({ error: messageError(error) });
      }
   }

   public async update(req: Request, res: Response) {
      try {
         const category = await this.categoryService.update(
            req.params.id,
            req.body
         );
         return res.status(200).json(category);
      } catch (error) {
         return res.status(500).json({ error: error });
      }
   }

   public async delete(req: Request, res: Response) {
      try {
         const category = await this.categoryService.delete(req.params.id);
         res.status(204).json(category);
      } catch (error) {
        return res.status(500).json({ error: error });
      }
   }

   public async getById(req: Request, res: Response) {
      try {
         const category = await this.categoryService.getById(req.params.id);
         res.status(200).json(category);
      } catch (error) {
        return res.status(500).json({ error: error });
      
      }
   }
}
