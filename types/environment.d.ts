import { Dialect } from "sequelize";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			DB_NAME: string;
			DB_USERNAME: string;
			DB_PASSWORD: string;
			DB_IP: string;
			DB_DIALECT: Dialect;
			DB_PORT: string;
			INSTALLED: string;
			jwtkey: string;
			jwtkeypub: string;
		}
	}
}
