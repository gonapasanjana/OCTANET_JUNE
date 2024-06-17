document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskName = document.getElementById('taskName');
    const taskPriority = document.getElementById('taskPriority');
    const taskDueDate = document.getElementById('taskDueDate');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add(task.completed ? 'completed' : 'not-completed');
            taskItem.innerHTML = `
                ${task.name} - ${task.priority} - ${task.dueDate}
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            `;
            taskList.appendChild(taskItem);
        });
    }
    
    // Add task
    addTaskButton.addEventListener('click', () => {
        const task = {
            name: taskName.value,
            priority: taskPriority.value,
            dueDate: taskDueDate.value,
            completed: false
        };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskName.value = '';
        taskPriority.value = 'medium';
        taskDueDate.value = '';
    });

    // Delete task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Toggle complete
    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Initial render
    renderTasks();
});
