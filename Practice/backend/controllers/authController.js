import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserById } from '../config/store.js';

const saltRounds = 10;
const authCookieName = 'authToken';

const authCookieOptions = {
	httpOnly: true,
	sameSite: 'lax',
	secure: false,
	path: '/',
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

function normalizeEmail(email) {
	return email.trim().toLowerCase();
}

function createToken(user) {
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		throw new Error('JWT secret is not configured.');
	}

	return jwt.sign(
		{
			sub: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		},
		secret,
		{ expiresIn: '7d' }
	);
}

function safeUser(user) {
	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
	};
}

export async function register(req, res) {
	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ message: 'All fields are required.' });
	}

	const normalizedEmail = normalizeEmail(email);
	const existingUser = await findUserByEmail(normalizedEmail);

	if (existingUser) {
		return res.status(409).json({ message: 'An account with that email already exists.' });
	}

	const hashedPassword = await bcrypt.hash(password, saltRounds);
	const user = await createUser({
		id: crypto.randomUUID(),
		firstName: firstName.trim(),
		lastName: lastName.trim(),
		email: normalizedEmail,
		password: hashedPassword,
		createdAt: new Date().toISOString(),
	});

	const token = createToken(user);

	res.cookie(authCookieName, token, authCookieOptions);
	return res.status(201).json({
		message: 'Account created successfully.',
		user: safeUser(user),
	});
}

export async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'Email and password are required.' });
	}

	const normalizedEmail = normalizeEmail(email);
	const user = await findUserByEmail(normalizedEmail);

	if (!user) {
		return res.status(401).json({ message: 'Invalid email or password.' });
	}

	const passwordMatches = await bcrypt.compare(password, user.password);

	if (!passwordMatches) {
		return res.status(401).json({ message: 'Invalid email or password.' });
	}

	const token = createToken(user);

	res.cookie(authCookieName, token, authCookieOptions);
	return res.json({
		message: 'Login successful.',
		user: safeUser(user),
	});
}

export async function getCurrentUser(req, res) {
	const user = await findUserById(req.user.sub);

	if (!user) {
		return res.status(404).json({ message: 'User not found.' });
	}

	return res.json({
		user: safeUser(user),
	});
}

export function logout(req, res) {
	return res.clearCookie(authCookieName, {
		...authCookieOptions,
		maxAge: undefined,
	}).json({
		message: 'Logged out successfully.',
	});
}