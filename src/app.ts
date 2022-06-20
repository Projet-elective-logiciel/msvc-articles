import * as express from "express";
import * as bodyParser from "body-parser";
import ArticlesController from "articles/articles.controller";

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: ArticlesController[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/api/", controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Article API listening on the port ${this.port}`);
        });
    }
}

export default App;