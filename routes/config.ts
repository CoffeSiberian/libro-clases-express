import { Request, Response } from "express";
import { hashPass } from "../helpers/hash";
import { Employee } from "../db/model";

const config = async (req: Request, res: Response, next: Function) => {
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
