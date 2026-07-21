const titleInput = document.querySelector('input[name="title"]');
const descTextarea = document.querySelector('textarea[name="desc"]');
const cardDiv = document.querySelector('.card');
const addTodoButton = document.querySelector('#addTodo');

const renderTodo = (title, description) => {
	const todoItem = document.createElement('div');
	todoItem.className = 'todo-item';

	todoItem.innerHTML = `
		<div>
			<h3>${title}</h3>
			<p>${description}</p>
		</div>
		<button type="button" class="complete-btn">Complete</button>
	`;

	const completeButton = todoItem.querySelector('.complete-btn');

	completeButton.addEventListener('click', () => {
		todoItem.classList.toggle('completed');
		completeButton.textContent = todoItem.classList.contains('completed') ? 'Completed' : 'Complete';
	});

	cardDiv.appendChild(todoItem);
};

addTodoButton.addEventListener('click', () => {
	const title = titleInput.value.trim();
	const description = descTextarea.value.trim();

	if (!title || !description) {
		alert('Please enter both a title and a description.');
		return;
	}

	renderTodo(title, description);
	titleInput.value = '';
	descTextarea.value = '';
	titleInput.focus();
});
