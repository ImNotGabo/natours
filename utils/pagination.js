export function pagination(req) {
	const PAGE = parseInt(req.query.page, 10) || 1;
	const LIMIT = parseInt(req.query.limit, 10) || 100;
	const SKIP = (PAGE - 1) * LIMIT;
	return { PAGE, LIMIT, SKIP };
}
