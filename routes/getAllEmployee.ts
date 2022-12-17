import { Request, Response } from "express";
import { Employee } from "../db/model";

const getAllEmployee = async (req: Request, res: Response) => {
	let query = await Employee.findAll({
		attributes: ["rut", "name", "rank"],
	});
	if (query.length === 0) return res.sendStatus(404);
	res.send(query);
};

export default getAllEmployee;
