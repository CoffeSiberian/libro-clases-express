import { Request, Response } from "express";
import { Op } from "sequelize";
import { Student, Observations, Grade } from "../db/model";

const getObservations = async (req: Request, res: Response) => {
	let rut = req.params.rut;
	if (rut === undefined) return res.sendStatus(404);
	let query = await Student.findAll({
		include: [
			{
				model: Observations,
				attributes: ["id", "observation", "createdAt"],
				required: false,
			},
			{
				model: Grade,
				attributes: ["id", "name"],
				required: true,
			},
		],
		where: { rut: { [Op.eq]: rut } },
		attributes: ["rut", "name"],
	});
	if (query.length === 0) return res.sendStatus(404);
	res.send(query[0]);
};

export default getObservations;
