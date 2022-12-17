import { sign } from "jsonwebtoken";
import { loadPrivate } from "../keys/loadKeys";
import { Employee } from "../db/model";

const privateKey = loadPrivate();

const jwtSing = async (user: Employee | null, callback: Function) => {
	if (user === null) return false;
	let usr = {
		rut: user.rut,
		name: user.name,
		rank: user.rank,
	};

	await sign(
		usr,
		privateKey,
		{ algorithm: "RS256", expiresIn: "1h" },
		(err, token) => {
			if (token === undefined) return callback(false);
			return callback(token);
		}
	);
};

export { jwtSing };
