import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME!;
const dbUserName = process.env.DB_USERNAME!;
const dbPassword = process.env.DB_PASSWORD!;
const dbIp = process.env.DB_IP!;
const dbPort = parseInt(process.env.DB_PORT!);

const db = new Sequelize(dbName, dbUserName, dbPassword, {
	host: dbIp,
	port: dbPort,
	dialect: "mysql",
});

export default db;
