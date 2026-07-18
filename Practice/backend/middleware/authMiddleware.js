import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
	const token = req.cookies?.authToken;

	if (!token) {
		return res.status(401).json({ message: 'Missing auth cookie.' });
	}

	try {
		const secret = process.env.JWT_SECRET;

		if (!secret) {
			return res.status(500).json({ message: 'JWT secret is not configured.' });
		}

		req.user = jwt.verify(token, secret);
		return next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired token.' });
	}
}