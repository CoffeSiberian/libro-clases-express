import express, { Express } from "express";
import http from "http";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes/routes";
import cors from "cors";
import { PORT } from "./helpers/config";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);
routes(app);

const httpServer = http.createServer(app);

httpServer.listen(PORT);
