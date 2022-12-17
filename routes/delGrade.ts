import { Request, Response } from "express";
import { Op } from "sequelize";
import { Grade } from "../db/model";

const delGrade = async (req: Request, res: Response) => {
	let idGrade = req.body[0]["id"];
	if (idGrade === undefined) return res.sendStatus(404);
	try {
		let query = await Grade.destroy({
			where: {
				id: { [Op.eq]: idGrade },
			},
		});
		if (query === 0) return res.sendStatus(404);
		res.sendStatus(200);
	} catch {
		res.sendStatus(500);
	}
};

export default delGrade;
