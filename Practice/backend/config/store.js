import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDirectory, 'users.json');

async function ensureStore() {
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
	await ensureStore();
	const rawContent = await readFile(usersFile, 'utf8');
	return rawContent.trim() ? JSON.parse(rawContent) : [];
}

async function writeUsers(users) {
	await ensureStore();
	await writeFile(usersFile, `${JSON.stringify(users, null, 2)}\n`, 'utf8');
}

export async function findUserByEmail(email) {
	const users = await readUsers();
	return users.find((user) => user.email === email) ?? null;
}

export async function findUserById(id) {
	const users = await readUsers();
	return users.find((user) => user.id === id) ?? null;
}

export async function createUser(userData) {
	const users = await readUsers();
	const nextUser = { ...userData };
	users.push(nextUser);
	await writeUsers(users);
	return nextUser;
}