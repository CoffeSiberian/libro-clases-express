import { Request, Response } from "express";
import { Employee } from "../db/model";
import { checkHash } from "../helpers/hash";
import { jwtSing } from "../helpers/jwt";

const login = async (req: Request, res: Response) => {
	let user = await Employee.findByPk(req.body["rut"]);
	if (user !== null) {
		checkHash(req.body["pass"], user.pass, async (response: boolean) => {
			if (response) {
				await jwtSing(user, (response: string | boolean) => {
					if (!response) return res.sendStatus(500);
					res.send({ token: response });
				});
			} else res.sendStatus(404);
		});
	} else res.sendStatus(404);
};

export default login;
