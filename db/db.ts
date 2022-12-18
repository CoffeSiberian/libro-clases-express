import { Sequelize } from "sequelize";

import {
	dbName,
	dbIp,
	dbUserName,
	dbPassword,
	dbPort,
} from "../helpers/config";

const db = new Sequelize(dbName, dbUserName, dbPassword, {
	host: dbIp,
	port: dbPort,
	dialect: "mysql",
});

export default db;
