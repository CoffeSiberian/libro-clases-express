import { Request, Response } from "express";
import { Op } from "sequelize";
import { Grade, Student, Lesson } from "../db/model";
import db from "../db/db";

const getTeacherGrades = async (req: Request, res: Response) => {
	let teacherRut = req.params.rut;
	if (teacherRut === undefined) return res.sendStatus(404);
	let query = await Grade.findAll({
		include: [
			{
				model: Student,
				attributes: [],
				required: false,
			},
            {
                model: Lesson,
				attributes: [],
				required: true,
				where: { fk_teacher: { [Op.eq]: teacherRut } },
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

export default getTeacherGrades;
