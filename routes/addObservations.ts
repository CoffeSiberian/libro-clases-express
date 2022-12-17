import { Request, Response } from "express";
import { Observations } from "../db/model";

const addObservations = async (req: Request, res: Response) => {
	let bod = req.body[0];
	try {
		await Observations.create(bod);
		res.sendStatus(200);
	} catch {
		res.sendStatus(500);
	}
};

export default addObservations;
