let tasks = [];

function addTasks(){
    document.getElementById("add-task").addEventListener('click', function(){
        const taskInput = document.getElementById('taskInput').value;
        const priorityInput = document.getElementById('priorityInput').value;
        if (taskInput) {
            tasks.push({ text: taskInput, priority: priorityInput, completed: false });
            localStorage.setItem('todos', JSON.stringify(tasks));
            document.getElementById('taskInput').value = '';
            renderTasks();
        }
    });
}

function renderTasks() {
    document.getElementById('taskList').innerHTML='';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `justify-content-between ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `${task.text} (${task.priority}) <span>
            <button class=" yes btn btn-success btn-sm">Complete</button>
            <button class=" no btn btn-danger btn-sm ml-1">Delete</button>
        </span>`;
        li.querySelector(".yes").addEventListener('click', function() {
            task.completed = !task.completed;
            localStorage.setItem('todos', JSON.stringify(tasks));
            renderTasks();
        });
        li.querySelector(".no").addEventListener('click', function() {
            tasks.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(tasks));
            renderTasks();
        });
        document.getElementById('taskList').appendChild(li);
    });
}

function renderCompletedTasks() {
    document.getElementById('completed-task-list').innerHTML='';
    tasks.forEach((task, index) => {
        if(task.completed)
        {
            const li = document.createElement('li');
            li.innerHTML = `${task.text} (${task.priority})`;
            document.getElementById('completed-task-list').appendChild(li);
        }
    });
}

function renderPriorityTasks() {
    document.getElementById('priority-task-list').innerHTML='';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `justify-content-between ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `${task.text} (${task.priority})`;
        document.getElementById('priority-task-list').appendChild(li);
    });
    document.getElementById('priority-filter').addEventListener('change', function(){
        document.getElementById('priority-task-list').innerHTML='';
            tasks.forEach((task, index) => {
                if(task.priority === document.getElementById('priority-filter').value )
                {
                    const li = document.createElement('li');
                    li.className = `justify-content-between ${task.completed ? 'completed' : ''}`;
                    li.innerHTML = `${task.text} (${task.priority})`;
                    document.getElementById('priority-task-list').appendChild(li);
                }
                if(document.getElementById('priority-filter').value === 'all' )
                    {
                        const li = document.createElement('li');
                        li.className = `justify-content-between ${task.completed ? 'completed' : ''}`;
                        li.innerHTML = `${task.text} (${task.priority})`;
                        document.getElementById('priority-task-list').appendChild(li);
                    }
            });
    });
}

function applyTheme(theme) {
  document.body.classList.remove('dark', 'light');
  document.body.classList.add(theme);
}

function selectTheme(){
    document.getElementById('themeSelect').addEventListener('change', function(event) {
        const chosenTheme = event.target.value;
        applyTheme(chosenTheme);
        localStorage.setItem('theme', chosenTheme);
      });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("content loads");
    const storedTasks = localStorage.getItem('todos');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    }
    storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        applyTheme(storedTheme);
    }
    if (window.location.pathname === '/TaskMaster/index.html')
    {
        console.log('This code is running in index.html');
        addTasks();
        renderTasks();
    }
    else if(window.location.pathname === '/TaskMaster/completed.html')
    {
        console.log('This code is running in completed.html');
        renderCompletedTasks();
    }
    else if (window.location.pathname === '/TaskMaster/priority.html')
    {
        console.log('This code is running in priority.html');
        renderPriorityTasks();
    }
    else if (window.location.pathname === '/TaskMaster/settings.html')
    {
        console.log('This code is running in settings.html');
        storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            document.getElementById('themeSelect').value = storedTheme;
        }
        selectTheme();
    }
});

