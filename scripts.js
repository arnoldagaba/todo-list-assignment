// Adding task
document.getElementById("add-task").addEventListener("click", addTask);

function addTask() {
	const taskInput = document.getElementById("new-task");
	const taskText = taskInput.value.trim();

	if (taskText) {
		const task = {
			id: Date.now(),
			text: taskText,
			completed: false,
		};
		saveTask(task);
		renderTask(task);
		taskInput.value = "";
	}
}

// Rendering task
function renderTask(task) {
	const taskList = document.getElementById("task-list");
	const taskItem = document.createElement("li");

	taskItem.id = task.id;
	taskItem.className = task.completed ? "completed" : "";
	taskItem.innerHTML = `
        <span>${task.text}</span>
        <div>
            <button aria-label="Edit task" onclick="editTask(${task.id})"><i class="fa fa-edit"></i></button>
            <button aria-label="Delete task" onclick="deleteTask(${task.id})"><i class="fa fa-trash"></i></button>
            <button aria-label="Complete task" onclick="toggleComplete(${task.id})"><i class="fa fa-check"></i></button>
        </div>`;
	taskList.appendChild(taskItem);
}

// Edit, delete, and complete tasks
function editTask(id) {
	const taskText = prompt("Edit your task:");

	if (taskText !== null) {
		// Check if user didn't cancel
		if (taskText.trim()) {
			updateTask(id, taskText);
		} else {
			alert("Task cannot be empty.");
		}
	}
}

function deleteTask(id) {
	removeTask(id);
	document.getElementById(id)?.remove();
}

function toggleComplete(id) {
	const taskItem = document.getElementById(id);

	taskItem.classList.toggle("completed");
	toggleTaskComplete(id);
}

// Persisting tasks with localStorage
function saveTask(task) {
	try {
		let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		tasks.push(task);
		localStorage.setItem("tasks", JSON.stringify(tasks));
	} catch (e) {
		console.error("Error saving task:", e);
	}
}

function updateTask(id, text) {
	try {
		let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		tasks = tasks.map((task) => (task.id === id ? { ...task, text } : task));
		localStorage.setItem("tasks", JSON.stringify(tasks));
		document.getElementById(id).querySelector("span").innerText = text;
	} catch (e) {
		console.error("Error updating task:", e);
	}
}

function removeTask(id) {
	try {
		let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		tasks = tasks.filter((task) => task.id !== id);
		localStorage.setItem("tasks", JSON.stringify(tasks));
	} catch (e) {
		console.error("Error removing task:", e);
	}
}

function toggleTaskComplete(id) {
	try {
		let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		tasks = tasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task
		);
		localStorage.setItem("tasks", JSON.stringify(tasks));
	} catch (e) {
		console.error("Error toggling task completion:", e);
	}
}

function loadTasks() {
	try {
		let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		tasks.forEach((task) => renderTask(task));
	} catch (e) {
		console.error("Error loading tasks:", e);
	}
}

function searchTasks() {
	const searchQuery = document
		.getElementById("search-task")
		.value.toLowerCase();
	const taskItems = document.querySelectorAll("#task-list li");

	taskItems.forEach((taskItem) => {
		const taskText = taskItem.querySelector("span").textContent.toLowerCase();
		if (taskText.includes(searchQuery)) {
			taskItem.style.display = "";
		} else {
			taskItem.style.display = "none";
		}
	});
}

window.onload = loadTasks;