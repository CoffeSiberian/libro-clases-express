import { Request, Response } from "express";
import { Op } from "sequelize";
import { Lesson, Qualification } from "../db/model";

const addQualification = async (req: Request, res: Response) => {
	let bod = req.body[0];

	let studentRut = bod["fk_student"];
	let lessonId = bod["fk_lesson"];
	let score = bod["score"];
	
	if (typeof score !== "number") return res.sendStatus(404);
	if (studentRut === undefined) return res.sendStatus(404);
	if (lessonId === undefined) return res.sendStatus(404);
	if (score === undefined) return res.sendStatus(404);
	if (score > 7 || score < 1) return res.sendStatus(404);
	if (!(await isPermited(req.body[1], lessonId))) return res.sendStatus(403);

	try {
		await Qualification.create(bod);
		res.sendStatus(200);
	} catch {
		res.sendStatus(500);
	}
};

const isPermited = async (jwt: any, lessonId: number) => {
	let rut = jwt["rut"];
	let rank = jwt["rank"];
	if (rank >= 10) return true;
	let query = await Lesson.findAll({
		attributes: ["id", "fk_teacher"],
		where: { id: { [Op.eq]: lessonId } },
	});
	if (query.length === 0) return false;
	if (query[0].fk_teacher !== rut) return false;
	return true;
};

export default addQualification;
