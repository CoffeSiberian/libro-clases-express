import { Request, Response } from "express";
import { Op } from "sequelize";
import { Grade, Student } from "../db/model";

const getStudent = async (req: Request, res: Response) => {
	let gradeId = req.params.gradeId;
	if (gradeId === undefined) return res.sendStatus(404);
	let query = await Grade.findAll({
		include: [
			{
				model: Student,
				attributes: ["rut", "name"],
				required: false,
			},
		],
		where: { id: { [Op.eq]: gradeId } },
		attributes: ["id", "name"],
	});
	if (query.length === 0) return res.sendStatus(404);
	res.send(query[0]);
};

export default getStudent;
