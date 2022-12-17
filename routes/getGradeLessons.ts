import { Request, Response } from "express";
import { Op } from "sequelize";
import { Grade, Lesson, Employee, Schedule } from "../db/model";

const getGradeLessons = async (req: Request, res: Response) => {
	let idGrade = req.params.id;
	if (idGrade === undefined) return res.sendStatus(404);
	let query = await Grade.findAll({
		include: [
			{
				model: Lesson,
				attributes: ["name"],
				where: { fk_grade: { [Op.eq]: idGrade } },
				required: true,
				include: [
					{
						model: Employee,
						attributes: ["rut", "name"],
						required: true,
					},
					{
						model: Schedule,
						attributes: ["id", "startAt", "endAt", "objective"],
						required: false,
					},
				],
			},
		],
		attributes: ["id", "name"],
		where: { id: { [Op.eq]: idGrade } },
	});
	if (query.length === 0) return res.sendStatus(404);
	res.send(query[0]);
};

export default getGradeLessons;
