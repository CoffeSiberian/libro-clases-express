import { Request, Response } from "express";
import { hashPass } from "../helpers/hash";
import { Employee } from "../db/model";
import { INSTALLED } from "../helpers/config";

const config = async (req: Request, res: Response, next: Function) => {
	if (INSTALLED === "true") return res.sendStatus(404);

	let bod = req.body;
	await hashPass(bod["pass"], async (response: string) => {
		try {
			bod = { ...bod, pass: response };
			await Employee.create(bod);
			res.sendStatus(200);
		} catch {
			res.sendStatus(500);
		}
	});
};

export default config;
