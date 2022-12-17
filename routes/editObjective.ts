import { Request, Response } from "express";
import { Op } from "sequelize";
import { Schedule, Lesson } from "../db/model";

const editObjective = async (req: Request, res: Response) => {
	let id = req.body[0]["id"];
	let objective = req.body[0]["objetive"];
	if (id === undefined) return res.sendStatus(404);
	if (objective === undefined) return res.sendStatus(404);
	if (!(await isPermited(req.body[1], id))) return res.sendStatus(403);
	try {
		let query = await Schedule.update(
			{ objective },
			{
				where: { id: { [Op.eq]: id } },
			}
		);
		if (query[0] === 0) return res.sendStatus(404);
		res.sendStatus(200);
	} catch {
		res.sendStatus(500);
	}
};

const isPermited = async (jwt: any, idSchedule: number) => {
	let rut = jwt["rut"];
	let rank = jwt["rank"];
	if (rank >= 10) return true;
	let query = await Schedule.findAll({
		include: [
			{
				model: Lesson,
				attributes: ["id", "name", "fk_teacher"],
				where: { fk_teacher: { [Op.eq]: rut } },
			},
		],
		attributes: ["id", "fk_lesson"],
		where: { id: { [Op.eq]: idSchedule } },
	});
	if (query.length === 0) return false;
	if (query[0].dataValues["Lesson"]["fk_teacher"] !== rut) return false;
	return true;
};

export default editObjective;
