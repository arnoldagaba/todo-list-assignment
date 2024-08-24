//Adding task
document.getElementById('add-task').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        saveTask(task);
        renderTask(task);
        taskInput.value = '';
    }
}


//Rendering task
function renderTask(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.id = task.id;
    taskItem.className = task.completed ? 'completed' : '';
    taskItem.innerHTML = `
        <span>${task.text}</span>
        <div>
            <button onclick="editTask(${task.id})"><i class="fa fa-edit"></i></button>
            <button onclick="deleteTask(${task.id})"><i class="fa fa-trash"></i></button>
            <button onclick="toggleComplete(${task.id})"><i class="fa fa-check"></i></button>
        </div>`;
    taskList.appendChild(taskItem);
}

//Edit, delete, and complete tasks:
function editTask(id) {
    const taskText = prompt('Edit your task:');
    if (taskText) {
        updateTask(id, taskText);
    }
}

function deleteTask(id) {
    removeTask(id);
    document.getElementById(id).remove();
}

function toggleComplete(id) {
    const taskItem = document.getElementById(id);
    taskItem.classList.toggle('completed');
    toggleTaskComplete(id);
}

//Persisting tasks with localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(id, text) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.id === id ? { ...task, text } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById(id).querySelector('span').innerText = text;
}

function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTaskComplete(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
}

window.onload = loadTasks;
