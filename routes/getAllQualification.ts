import { Request, Response } from "express";
import { Op } from "sequelize";
import { Qualification, Lesson, Employee, Grade } from "../db/model";

const getAllQualification = async (req: Request, res: Response) => {
	let rut = req.params.rut;
	if (rut === undefined) return res.sendStatus(404);
	let query = await Qualification.findAll({
		include: [
			{
				model: Lesson,
				attributes: ["id", "name"],
				required: true,
				include: [
					{
						model: Employee,
						attributes: ["rut", "name"],
					},
					{
						model: Grade,
						attributes: ["id", "name"],
					},
				],
			},
		],
		where: { fk_student: { [Op.eq]: rut } },
		attributes: ["id", "score", "createdAt", "UpdatedAt"],
	});
	if (query.length === 0) return res.sendStatus(404);
	res.send(query);
};

export default getAllQualification;
