const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

async function request(path, options = {}) {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...(options.headers || {}),
		},
		...options,
	});

	const payload = await response.json().catch(() => ({}));

	if (!response.ok) {
		throw new Error(payload.message || 'Request failed.');
	}

	return payload;
}

export function registerUser(userData) {
	return request('/auth/register', {
		method: 'POST',
		body: JSON.stringify(userData),
	});
}

export function createSimpleUser(userData) {
	return request('/simple/users', {
		method: 'POST',
		body: JSON.stringify(userData),
	});
}

export function loginUser(credentials) {
	return request('/auth/login', {
		method: 'POST',
		body: JSON.stringify(credentials),
	});
}

export function fetchCurrentUser() {
	return request('/auth/me');
}

export function logoutUser() {
	return request('/auth/logout', {
		method: 'POST',
	});
}