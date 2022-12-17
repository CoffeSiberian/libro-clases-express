import { Request, Response } from "express";
import { Op } from "sequelize";
import { Qualification, Lesson, Grade } from "../db/model";

const getLessonQualification = async (req: Request, res: Response) => {
	let rut = req.params.rut;
	let lessonId = req.params.lessonId;
	if (rut === undefined) return res.sendStatus(404);
	if (lessonId === undefined) return res.sendStatus(404);
	let query = await Lesson.findAll({
		include: [
			{
				model: Grade,
				attributes: ["id", "name"],
				required: true,
			},
			{
				model: Qualification,
				attributes: ["id", "score"],
				where: { fk_student: { [Op.eq]: rut } },
				required: false,
			},
		],
		where: { id: { [Op.eq]: lessonId } },
		attributes: ["id", "name"],
	});
	if (query.length === 0) return res.sendStatus(404);
	res.send(query[0]);
};

export default getLessonQualification;
