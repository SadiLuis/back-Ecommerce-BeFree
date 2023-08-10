import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import IUser from "./interfaces/User.interfaces";
import { passwordHash } from "../../util/passwordHash";





class UserModel {
   private _model: Model<IUser>;

   constructor() {
      const userSchema = new Schema<IUser>(
         {
            username: {
               type: String,
               required: true,
               unique: true,
               trim: true,
            },
            email: {
               type: String,
               required: true,
               unique: true,
               trim: true,
               lowercase: true,
            },
            password: {
               type: String,
               required: false,
               trim: true,
            },

            role: {
               type: String,
               enum: ["admin", "user"],
               default: "user",
            },
            name: {
               type: String,
               required: true,
               trim: true,
            },
            lastname: {
               type: String,
               required: false,
               trim: true,
            },
            phone: {
               type: String,
               required: false,
               trim: true,
            },
            avatar: {
               type: String,
               required: false,
            },
            city: {
               type: String,
               required: false,
            },
            country: {
               type: String,
               required: false,
            },
            address: {
               type: String,
               required: false,
            },
         },
         { timestamps: true }
      );

      userSchema.pre<IUser>("save", async function (next) {
         const user = this;
         if (!user.isModified("password")) return next();

         user.password = await passwordHash(user.password);
         next();
      });

      userSchema.methods.comparePassword = async function (
         password: string
      ): Promise<boolean> {
         return await bcrypt.compare(password, this.password);
      };

      this._model = model<IUser>("User", userSchema);
   }

   get model(): Model<IUser> {
      return this._model;
   }
}

const userModel = new UserModel();
export default userModel.model;


// const userSchema = new Schema<IUser>(
//     {
//        username: {
//           type: String,
//           required: true,
//           unique: true,
//           trim: true,
//        },
//        email: {
//           type: String,
//           required: true,
//           unique: true,
//           trim: true,
//           lowercase: true,
//        },
//        password: {
//           type: String,
//           required: false,
//           trim: true,
//        },

//        role: {
//           type: String,
//           enum: ["admin", "user"],
//           default: "user",
//        },
//        name: {
//           type: String,
//           required: true,
//           trim: true,
//        },
//        lastname: {
//           type: String,
//           required: false,
//           trim: true,
//        },
//        phone: {
//           type: String,
//           required: false,
//           trim: true,
//        },
//        avatar: {
//           type: String,
//           required: false,
//        },
//        city: {
//           type: String,
//           required: false,
//        },
//        country: {
//           type: String,
//           required: false,
//        },
//        address: {
//           type: String,
//           required: false,
//        },
//     },
//     { timestamps: true }
//  );

//  userSchema.pre<IUser>("save", async function (next) {
//     const user = this;
//     if (!user.isModified("password")) return next();
 
//     user.password = await passwordHash(user.password);
//     next();
//  });
 
//  userSchema.methods.comparePassword = async function (
//     password: string
//  ): Promise<boolean> {
//     return await bcrypt.compare(password, this.password);
//  };

//  export default model<IUser>("User", userSchema);