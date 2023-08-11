import config from "../../../config/config";
import jwt from "jsonwebtoken";
import CRUDManager from "../../../util/manager/ManagerCRUD";
import UserModels from "../User.models";
import IUser from "../interfaces/User.interfaces";

export default class UserManager extends CRUDManager<IUser> {
   private static instances: UserManager;
   // private readonly user : UserModels = new UserModels();

   private constructor() {
      super(UserModels);
   }

   public getByEmail = async (email: string) => {
      try {
         return await this.getModel().findOne({ email: email });
      } catch (error) {
         throw error;
      }
   };

   createToken(user: IUser| any) {
      return jwt.sign({ id: user._id, email: user.email, role: user.role.roleName }, config.jwtSecret, {
         expiresIn: 3600,
      });
   }
   public static getInstance() {
      if (!UserManager.instances) {
         UserManager.instances = new UserManager();
      }
      return UserManager.instances;
   }
}
