import CRUDManager from "../../../util/manager/ManagerCRUD";
import ProductModels from "../Product.models";
import IProduct from "../interfaces/Porduct.interfaces";

export default class ProductManager extends CRUDManager<IProduct> {
    private static instance: ProductManager

    private constructor(){
        super(ProductModels)
    }

    public static getInstance(): ProductManager {
        if(!ProductManager.instance){
            ProductManager.instance = new ProductManager()
        }
        return ProductManager.instance
    
    }
}