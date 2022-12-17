import express, { Express } from "express";
//import https from "https";
import http from "http"
//import fs from "fs";
import routes from "./routes/routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
//const port = process.env.API_PORT;

app.use(cors());
app.use(express.json());

routes(app);

//const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);

httpServer.listen(80);
