import { Document } from "mongoose";

export default interface IUser extends Document {
   name: string;
   lastname: string;
   username: string;
   email: string;
   password: string;
   role: string;
   phone: string;
   address: string;
   city: string;
   country: string;
   avatar: string;
   comparePassword: (passwoed: string) => Promise<boolean>;
}
