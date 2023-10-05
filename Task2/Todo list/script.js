function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const todoList = document.getElementById('todoList').getElementsByTagName('ul')[0];
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="complete" onclick="completeTask(this)">Complete</button>
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="remove" onclick="removeTask(this)">Remove</button>
        `;

        todoList.appendChild(li);
        
        taskInput.value = '';
    }
}

function completeTask(button) {
    const taskItem = button.closest('li');
    const completedList = document.getElementById('completedList').getElementsByTagName('ul')[0];
    taskItem.querySelector('.complete').remove();  // Remove complete button
    taskItem.querySelector('.edit').remove();  // Remove edit button

    // Add task to the completed list
    completedList.appendChild(taskItem);

    // Add a revert button to completed item
    const revertBtn = document.createElement('button');
    revertBtn.classList.add('revert');
    revertBtn.textContent = 'Revert';
    revertBtn.onclick = function () {
        revertTask(this);
    };
    taskItem.appendChild(revertBtn);
}

function revertTask(button) {
    const taskItem = button.closest('li');
    const todoList = document.getElementById('todoList').getElementsByTagName('ul')[0];
    taskItem.querySelector('.revert').remove();  // Remove revert button

    // Add complete and edit buttons back to the task
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.textContent = 'Complete';
    completeBtn.onclick = function () {
        completeTask(this);
    };

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.textContent = 'Edit';
    editBtn.onclick = function () {
        editTask(this);
    };

    taskItem.insertBefore(completeBtn, taskItem.firstChild);
    taskItem.insertBefore(editBtn, taskItem.firstChild);

    // Add task back to the todo list
    todoList.appendChild(taskItem);
}

function editTask(button) {
    const taskItem = button.closest('li');
    const taskTextElement = taskItem.querySelector('.task-text');
    const taskText = taskTextElement.textContent;
    const newTaskText = prompt('Edit Task:', taskText);

    if (newTaskText !== null) {
        taskTextElement.textContent = newTaskText;
    }
}

function removeTask(button) {
    const taskItem = button.closest('li');
    taskItem.remove();
}
