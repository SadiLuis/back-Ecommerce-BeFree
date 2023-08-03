import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/database";
import User from "./models/User";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

(async () => {
    try {
      await sequelize.authenticate();
      console.log("Database connection has been established successfully.");
  
      await sequelize.sync({ alter: true }); // Esto creará automáticamente las tablas según los modelos definidos.
  
      console.log("All models were synchronized successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();