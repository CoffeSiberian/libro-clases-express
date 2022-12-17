import { Request, Response } from "express";
import { autTest } from "../db/model";
import getJwt from "./getJwt";
import { verify } from "jsonwebtoken";
import { loadPublic } from "../keys/loadKeys";

const publicKey = loadPublic();

const dbCheck = async (req: Request, res: Response, next: Function) => {
	if (!(await autTest())) {
		res.sendStatus(500);
		return false;
	}
	return next();
};

const checkDirector = async (req: Request, res: Response, next: Function) => {
	await getBearerObj(req, res, (decode: any) => {
		if (decode["rank"] >= 10) {
			req.body = [req.body, decode];
			return next();
		} else res.sendStatus(403);
	});
};

const checkTeacher = async (req: Request, res: Response, next: Function) => {
	await getBearerObj(req, res, (decode: any) => {
		if (decode["rank"] >= 1) {
			if (
				(req.method === "POST" || req.method === "PUT") &&
				decode["rank"] === 2
			) {
				return res.sendStatus(403);
			}
			req.body = [req.body, decode];
			return next();
		} else res.sendStatus(403);
	});
};

const checkInspector = async (req: Request, res: Response, next: Function) => {
	await getBearerObj(req, res, (decode: any) => {
		if (decode["rank"] >= 2) {
			req.body = [req.body, decode];
			return next();
		} else res.sendStatus(403);
	});
};

const getBearerObj = async (
	req: Request,
	res: Response,
	callback: Function
) => {
	const bearer = getJwt(req.headers["authorization"]);
	if (bearer) {
		await verify(bearer, publicKey, (err, decoded) => {
			if (decoded !== undefined) {
				if (typeof decoded === "object") {
					return callback(decoded);
				} else return res.sendStatus(403);
			}
			return res.sendStatus(403);
		});
	} else res.sendStatus(403);
};

const checkValidate = async (req: Request, res: Response, next: Function) => {
	await getBearerObj(req, res, (decode: any) => {
		res.sendStatus(200);
	});
};

export { dbCheck, checkDirector, checkInspector, checkTeacher, checkValidate };
