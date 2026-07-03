const userGrid = document.getElementById("userGrid");
const status = document.getElementById("status");
const reloadBtn = document.getElementById("reloadBtn");

const renderUsers = users => {
	userGrid.innerHTML = users
		.map(user => `
			<article class="card">
				<div class="badge">User #${user.id}</div>
				<h3>${user.name}</h3>
				<p class="meta"><strong>Username:</strong> ${user.username}</p>
				<p class="meta"><strong>Email:</strong> ${user.email}</p>
				<p class="meta"><strong>Phone:</strong> ${user.phone}</p>
				<p class="meta"><strong>Company:</strong> ${user.company.name}</p>
				<p class="meta"><strong>Website:</strong> ${user.website}</p>
			</article>
		`)
		.join("");
};

const loadUsers = async () => {
	userGrid.innerHTML = "";

	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/users");

		if (!response.ok) {
			throw new Error("Failed to fetch user data");
		}

		const users = await response.json();
		renderUsers(users);
		status.textContent = `Loaded ${users.length} users from a dummy API.`;
	} catch (error) {
		status.textContent = error.message;
	}
};

reloadBtn.addEventListener("click", loadUsers);
loadUsers();
