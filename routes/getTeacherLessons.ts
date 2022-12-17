import { Request, Response } from "express";
import { Op } from "sequelize";
import { Grade, Lesson, Employee } from "../db/model";

const getTeacherLessons = async (req: Request, res: Response) => {
	let teacherRut = req.params.rut;
	if (teacherRut === undefined) return res.sendStatus(404);
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
		where: { fk_teacher: { [Op.eq]: teacherRut } },
	});
	if (query.length === 0) return res.sendStatus(404);
	res.send(query);
};

export default getTeacherLessons;
