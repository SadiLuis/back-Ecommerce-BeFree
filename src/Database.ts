import mongoose from "mongoose";
import config from "./config/config";

export default class Database {
   private static instance: Database;
   private database: mongoose.Connection;

   private constructor() {
      this.database = mongoose.connection;
   }

   public static getInstance(): Database {
      if (!Database.instance) {
         Database.instance = new Database();
      }
      return Database.instance;
   }

   public async connect(): Promise<any> {
      // await mongoose.connect(config.DB.URI);

      // this.database.on(
      //    "error",
      //    console.error.bind(console, "connection error:")
      // );
      // await new Promise<void>((resolve) => {
      //    this.database.once("open", () => {
      //       console.log(
      //          "MongoDB database connection established successfully"
      //       );
      //       resolve();
      //    });
      // });

      try {
         const connection = await mongoose.connect(config.DB.URI);
         console.log("MongoDB database connection established successfully");
         return connection.connection
      } catch (error) {
         console.error.bind(console, "connection error:");
      }
   }

   public async disconnect(): Promise<void> {
      await mongoose.disconnect();
      console.log("MongoDB database connection closed successfully");
   }
}
