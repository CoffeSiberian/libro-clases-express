import { Request, Response } from "express";
import { Employee } from "../db/model";
import { Op } from "sequelize";

const getOnlyTeachers = async (req: Request, res: Response) => {
	let query = await Employee.findAll({
		attributes: ["rut", "name", "rank"],
		where: { rank: { [Op.eq]: 1 } },
	});
	if (query.length === 0) return res.sendStatus(404);
	res.send(query);
};

export default getOnlyTeachers;
