import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT!;
export const dbName = process.env.DB_NAME!;
export const dbUserName = process.env.DB_USERNAME!;
export const dbPassword = process.env.DB_PASSWORD!;
export const dbIp = process.env.DB_IP!;
export const dbPort = parseInt(process.env.DB_PORT!);
export const INSTALLED = process.env.INSTALLED!.toLocaleLowerCase();
export const jwtKey = process.env.jwtkey!;
export const jwtKeyPub = process.env.jwtkeypub!;
