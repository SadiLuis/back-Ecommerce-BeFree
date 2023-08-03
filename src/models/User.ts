// src/models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {}

User.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
