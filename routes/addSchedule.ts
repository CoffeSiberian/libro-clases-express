import { Request, Response } from "express";
import { Schedule } from "../db/model";

const addSchedule = async (req: Request, res: Response) => {
	let bod = req.body[0];
	try {
		await Schedule.create(bod);
		res.sendStatus(200);
	} catch {
		res.sendStatus(500);
	}
};

export default addSchedule;
