import express,{ Express } from "express";
import cors,{ CorsOptions } from "cors";
import "dotenv/config";
import morgan from "morgan";
import Database from "./Database";
import UserRoutes from "./routes/users.routes";


export default class App {
    private static instance: App;
    private app: Express;    
    private corsOptions: CorsOptions = {
        origin: "*",
        optionsSuccessStatus: 200,  
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
    private database: Database;

    private userRoutes: UserRoutes;

     private constructor(){
        this.app = express();
        this.database= Database.getInstance();
        this.userRoutes = UserRoutes.getInstance();
        
        this.middlewares();
        this.databaseConnection();
        this.routes()

        
    }

    private  middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cors(this.corsOptions));
        this.app.use(morgan("dev"));    
    }

    private async databaseConnection(){
        const prueba = await this.database.connect(); 
        // console.log(prueba);
        return  prueba
        
    }

    private routes=()=>{
        this.app.get("/", (req,res)=>{
            return res.send("Hello World").status(200);
        });
        this.app.use('/api/v1/', this.userRoutes.getRouter())
    
    }
    
   

     public  getApp(){
        return this.app;
    }

     public static getInstances(){
        if(!App.instance){
            App.instance = new App();
        }
        return App.instance;
     }
    }
