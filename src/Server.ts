import App from "./App";
import config from "./config/config";

export default class Server{
    private static instance: Server;
    private readonly app: App;

    private constructor(){
        this.app = App.getInstances()
    }

    public start(): any{
        const port = config.port
        const server = this.app.getApp().listen(port, () => {
           console.log(`Server listening on port ${port}`);
        });
        return server;
    }
    public stop(): any{
        return this.app.getApp().off;
    
    }

    public static getInstance(): Server{
        if(!Server.instance){
            Server.instance = new Server();
        }
        return Server.instance;
    
    }
}