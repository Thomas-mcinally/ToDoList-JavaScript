//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

//Functions
function addTodo(event){
    //prevent form from submitting 
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton)
    //TRASH BUTTON
    const thrashButton = document.createElement('button');
    thrashButton.innerHTML = '<i class="fas fa-trash"></i>'
    thrashButton.classList.add("trash-btn");
    todoDiv.appendChild(thrashButton)
    //APPEND TO TODO-LIST
    todoList.appendChild(todoDiv)
}

function deleteCheck(event){
    const item = event.target;

    //DELETE TODO
    if(item.className == 'trash-btn'){
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })

    }

    //CHECK MARK TODO
    if(item.className == 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }

}

function filterTodo(event) {
    const todos = todoList.childNodes;
    console.log(todos)
    todos.forEach(function(todo){
        console.log(event.target.value)
        console.log(todo)
        console.log(todo.classList)
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex'
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
        }
    });
}
