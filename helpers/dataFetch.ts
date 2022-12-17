const dataFetch = async (
	body = null,
	method: string,
	headers: HeadersInit,
	url: URL
) => {
	let optiosFetch = {
		method: method,
		headers: headers,
		body: body,
	};

	try {
		return await fetch(url, optiosFetch);
	} catch (err: any) {
		return err.message;
	}
};

const getFetch = async (
	body = null,
	headers: HeadersInit,
	url: URL
): Promise<Response> => {
	return await dataFetch(body, "GET", headers, url);
};

const putFetch = async (
	body = null,
	headers: HeadersInit,
	url: URL
): Promise<Response> => {
	return await dataFetch(body, "PUT", headers, url);
};

const postFetch = async (
	body = null,
	headers: HeadersInit,
	url: URL
): Promise<Response> => {
	return await dataFetch(body, "POST", headers, url);
};

export { getFetch, putFetch, postFetch };
