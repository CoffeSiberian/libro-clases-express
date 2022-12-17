import { Request, Response } from "express";
import { Student } from "../db/model";

const addStudent = async (req: Request, res: Response) => {
	let bod = req.body[0];
	try {
		await Student.create(bod);
		res.sendStatus(200);
	} catch {
		res.sendStatus(500);
	}
};

export default addStudent;
