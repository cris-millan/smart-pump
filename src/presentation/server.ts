import express, { Router } from 'express';
import cors from 'cors';


interface Options {
    port: number,
    routes: Router 
    publicPath: string
}


export class Server {
    
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const {port, routes,  publicPath ='public'} = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }
    
    async start() {

        this.app.use(cors({
            origin: "*"
        }));

        //* Middleware
        //serialize body as a json.
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );

        //* public folder
        this.app.use( express.static('public') );

        //* Routes
        this.app.use( this.routes );
        
        //*SPA


        this.app.listen(this.port, () => {
            console.log(`server is runing on port ${this.port}`);
        })
    }

}

