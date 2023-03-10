import { Request, Response } from "express";
import { hashPass } from "../helpers/hash";
import { Employee } from "../db/model";

const addEmployee = async (req: Request, res: Response) => {
	let bod = req.body[0];
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

export default addEmployee;
