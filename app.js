//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getSavedTodos);
todoButton.addEventListener('click', newTodo);
todoList.addEventListener('click', updateTodoStatus);
filterOption.addEventListener('click', filterTodo);

//Functions
function addItemToTodoListHTML(item) {
    //OUTER DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //LI
    const newTodo = document.createElement('li');
    newTodo.innerText = item;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //TRASH BUTTON
    const thrashButton = document.createElement('button');
    thrashButton.innerHTML = '<i class="fas fa-trash"></i>';
    thrashButton.classList.add("trash-btn");
    todoDiv.appendChild(thrashButton);
    //INSERT DIV INTO CORRECT PART OF HTML
    todoList.appendChild(todoDiv);
}

function newTodo(event) {
    //DEFAULT BEHAVIOUR IS TO SUBMIT FORM AND RELOAD PAGE
    event.preventDefault();
    if (todoInput.value == '') {return;}

    addItemToTodoListHTML(todoInput.value);
    saveTodosLocally(todoInput.value);
    todoInput.value = '';
}

function updateTodoStatus(event) {
    const item = event.target;

    //DELETE
    if (item.className == 'trash-btn') {
        const todo = item.parentElement;
        //ANIMATION
        todo.classList.add('fall');
        removeSavedTodo(todo);
        todo.addEventListener('transitionend', function() {
            //ANIMATION FINISHED
            todo.remove();
        })
    }

    //MARK COMPLETED
    if (item.className == 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

function fetchSavedTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function saveTodosLocally(todo) {
    let todos;
    todos = fetchSavedTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getSavedTodos() {
    let todos;
    todos = fetchSavedTodos();
    todos.forEach(addItemToTodoListHTML);
}

function removeSavedTodo(todo) {
    let todos;
    todos = fetchSavedTodos();
    const itemToRemove = todo.children[0].innerText;
    todos.splice(todos.indexOf(itemToRemove), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}