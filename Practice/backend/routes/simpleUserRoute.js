import { Router } from 'express';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDirectory, 'users.json');
const authCookieName = 'authToken';
const authCookieOptions = {
	httpOnly: true,
	sameSite: 'lax',
	secure: false,
	path: '/',
	maxAge: 7 * 24 * 60 * 60 * 1000,
};
const saltRounds = 10;

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
			sub: String(user.id),
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

async function ensureUsersFile() {
	await mkdir(dataDirectory, { recursive: true });

	try {          
		await readFile(usersFile, 'utf8');
	} catch (error) {
		if (error.code === 'ENOENT') {
			await writeFile(usersFile, '[]\n', 'utf8');
			return;
		}

		throw error;
	}
}

async function readUsers() {
	await ensureUsersFile();
	const rawContent = await readFile(usersFile, 'utf8');
	return rawContent.trim() ? JSON.parse(rawContent) : [];
}

async function writeUsers(users) {
	await ensureUsersFile();
	await writeFile(usersFile, `${JSON.stringify(users, null, 2)}\n`, 'utf8');
}


router.post('/user-login',(req,res)=>{
const {email,password}=req.body;

if (!email || !password) {
	return res.status(400).json({ message: 'Email and password are required.' });
}

const normalizedEmail = normalizeEmail(email);

readUsers()
	.then((users) => {
		const user = users.find((entry) => entry.email === normalizedEmail);

		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password.' });
		}

		return bcrypt.compare(password, user.password).then((passwordMatches) => {
			if (!passwordMatches) {
				return res.status(401).json({ message: 'Invalid email or password.' });
			}

			const token = createToken(user);
			res.cookie(authCookieName, token, authCookieOptions);
			return res.json({
				message: 'Login successful.',
				user: safeUser(user),
			});
		});
	})
	.catch((error) => {
		return res.status(500).json({ message: error.message || 'Internal server error.' });
	});

})
router.post('/users', async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ message: 'All fields are required.' });
	}

	const cleanedFirstName = firstName.trim();
	const cleanedLastName = lastName.trim();
	const cleanedEmail = normalizeEmail(email);
	const cleanedPassword = password.trim();

	if (!cleanedFirstName || !cleanedLastName || !cleanedEmail || !cleanedPassword) {
		return res.status(400).json({ message: 'All fields must be filled in.' });
	}

	const users = await readUsers();
	const existingUser = users.find((user) => user.email === cleanedEmail);

	if (existingUser) {
		return res.status(409).json({ message: 'User already exists with this email.' });
	}
	const hashedPassword = await bcrypt.hash(cleanedPassword, saltRounds);
	const newUser = {
		id: crypto.randomUUID(),
		firstName: cleanedFirstName,
		lastName: cleanedLastName,
		email: cleanedEmail,
		password: hashedPassword,
		createdAt: new Date().toISOString(),
	};

	users.push(newUser);
	await writeUsers(users);

	return res.status(201).json({
		message: 'User saved successfully.',
		user: {
			id: newUser.id,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			createdAt: newUser.createdAt,
		},
	});
});

export default router;