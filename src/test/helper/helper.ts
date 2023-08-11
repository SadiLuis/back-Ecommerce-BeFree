import ProductDTO from "../../models/product/DTO/Product.DTO";
import ProductManager from "../../models/product/manager/Product.manager";
import UserDTO from "../../models/users/DTO/User.DTO";
import UserManager from "../../models/users/manager/UserManager"
import ICRUD  from "../../util/interfaces/CRUD.Interfaces"

const managerHelper = {
    userManagerhelper: UserManager.getInstance(),
    productManager: ProductManager.getInstance()
}
const userHelper= {
    email: "XXXXXXXXXXXXXX",
    password: "XXXXXXXXXXXXXX",
    username: "XXXXXXXXXXXXXX",
    confirPassword: "XXXXXXXXXXXXXX",
    name: "XXXXXXXXXXXXXX",
 };

 const productHelper: ProductDTO = {
    name: "XXXXXXXXXXXXXX",
    description: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  XXXXXXXXXXXXXX XXXXXXXXXXXXXX",
    price: 9999,    
    stock: 1,   
 }


export{
    managerHelper,
    userHelper,
    productHelper
}