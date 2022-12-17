import { Request, Response } from "express";
import { Lesson } from "../db/model";

const addLessons = async (req: Request, res: Response) => {
	let bod = req.body[0];
	try {
		await Lesson.create(bod);
		res.sendStatus(200);
	} catch {
		res.sendStatus(500);
	}
};

export default addLessons;
