const getJwt = (bearer: string | undefined) => {
	if (typeof bearer !== "undefined") {
		const bearerToken = bearer.split(" ")[1];
		return bearerToken;
	}
	return false;
};

export default getJwt;
