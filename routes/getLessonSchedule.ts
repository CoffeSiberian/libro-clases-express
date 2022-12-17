import { Request, Response } from "express";
import { Op } from "sequelize";
import { Lesson, Schedule, Grade } from "../db/model";

const getLessonSchedule = async (req: Request, res: Response) => {
	let LessonId = req.params.id;
	if (LessonId === undefined) return res.sendStatus(404);
	let query = await Schedule.findAll({
		include: [
			{
				model: Lesson,
				attributes: ["id", "name"],
				where: { id: { [Op.eq]: LessonId } },
				include: [
					{
						model: Grade,
						attributes: ["id", "name"],
					},
				],
			},
		],
		attributes: ["id", "startAt", "endAt", "objective"],
	});
	if (query.length === 0) return res.sendStatus(404);
	res.send(query);
};

export default getLessonSchedule;
