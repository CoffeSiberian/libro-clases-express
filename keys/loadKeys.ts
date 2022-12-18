import { jwtKey, jwtKeyPub } from "../helpers/config";

const loadPrivate = () => {
	return jwtKey;
};

const loadPublic = () => {
	return jwtKeyPub;
};

export { loadPrivate, loadPublic };
