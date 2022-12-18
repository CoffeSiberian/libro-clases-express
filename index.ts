import express, { Express } from "express";
//import https from "https";
import http from "http";
import routes from "./routes/routes";
import cors from "cors";
import { PORT } from "./helpers/config";

const app: Express = express();

app.use(cors());
app.use(express.json());
routes(app);

//const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);

httpServer.listen(PORT);
