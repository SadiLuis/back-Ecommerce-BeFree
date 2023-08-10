import UserDTO from "../../models/users/DTO/User.DTO";
import UserManager from "../../models/users/manager/UserManager"
import ICRUD  from "../../util/interfaces/CRUD.Interfaces"

const managerHelper = {
    userManagerhelper: UserManager.getInstance()
}
export const userHelper= {
    email: "XXXXXXXXXXXXXX",
    password: "XXXXXXXXXXXXXX",
    username: "XXXXXXXXXXXXXX",
    confirPassword: "XXXXXXXXXXXXXX",
    name: "XXXXXXXXXXXXXX",
 };


export{
    managerHelper
}