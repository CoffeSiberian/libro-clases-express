import { Request, Response } from "express";
import { Grade, Student } from "../db/model";
import db from "../db/db";

const getAllGrades = async (req: Request, res: Response) => {
	let query = await Grade.findAll({
		include: [
			{
				model: Student,
				attributes: [],
				required: false,
			},
		],
		attributes: [
			"id",
			"name",
			[db.fn("COUNT", db.col(`Students.rut`)), "count"],
		],
		group: [`Grade.id`],
		order: [["name", "ASC"]],
	});
	if (query.length === 0) return res.sendStatus(404);
	res.send(query);
};

export default getAllGrades;
