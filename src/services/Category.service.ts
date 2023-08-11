import CategoryManager from "../models/category/manager/Category.manager";
import CategoryModels from "../models/category/Category.models";
import ICategory from "../models/category/interfaces/Category.interfaces";


export default class CategoryService {
    private static instance: CategoryService;
    private categoryManager: CategoryManager;

    private constructor() {
        this.categoryManager = CategoryManager.getInstance();
    }

    public async create(category: ICategory): Promise<ICategory> {
        return await this.categoryManager.create(category);
    }

    public async getAll(): Promise<ICategory[]> {
        return await this.categoryManager.getAll();
    }

    public async getById(id: string): Promise<ICategory> {
        return await this.categoryManager.getById(id);
    }

    public async update(id: string, category: ICategory): Promise<ICategory> {
        return await this.categoryManager.update(id, category);
    }

    public async delete(id: string): Promise<ICategory | null> {
        return await this.categoryManager.delete(id);
    }

    public static getInstance(): CategoryService {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService();
        }
        return CategoryService.instance;
    
    }
   

    
}
