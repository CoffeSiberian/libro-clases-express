import { Sequelize } from "sequelize";

import {
	dbName,
	dbIp,
	dbUserName,
	dbPassword,
	dbPort,
	dbDialect
} from "../helpers/config";

const db = new Sequelize(dbName, dbUserName, dbPassword, {
	host: dbIp,
	port: dbPort,
	dialect: dbDialect,
});

export default db;
