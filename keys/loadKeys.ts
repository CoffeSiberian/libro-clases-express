import fs from "fs";

const privateJwtKey = fs.readFileSync("keys/jwt-key", "utf8");
const publicJwtKey = fs.readFileSync("keys/jwt-key.pub", "utf8");

const loadPrivate = () => {
	return privateJwtKey;
};

const loadPublic = () => {
	return publicJwtKey;
};

export { loadPrivate, loadPublic };
