import { Request, Response } from "express";
import { Grade, Lesson, Employee } from "../db/model";

const getAllLessons = async (req: Request, res: Response) => {
	let query = await Lesson.findAll({
		include: [
			{
				model: Employee,
				attributes: ["rut", "name"],
				required: true,
			},
			{
				model: Grade,
				attributes: ["id", "name"],
				required: true,
			},
		],
		attributes: ["id", "name"],
	});
	if (query.length === 0) return res.sendStatus(404);
	res.send(query);
};

export default getAllLessons;
