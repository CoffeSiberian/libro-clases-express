import { Request, Response } from "express";
import { Grade } from "../db/model";

const addGrade = async (req: Request, res: Response) => {
	let bod = req.body[0];
	try {
		await Grade.create(bod);
		res.sendStatus(200);
	} catch {
		res.sendStatus(500);
	}
};

export default addGrade;
