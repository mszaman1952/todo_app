

// html
// css
// js
// setTimeout
// localStorage
// Array
// mapping
// dom manipulation 
// event listener
// step one : create the html basic structure
// step two : style html elements 
// step three : find all the html elements and add listeners 
// step four : add todo 
// step five : showMessage 
// step six : add localStorage 
// step seven : delete Todo
// setp eight : read todo 


// finding element =================================

const container = document.querySelector('.container');
const todoForm = container.querySelector('.todo-form');
const todoInput = container.querySelector('#inputTodo');
const todoAddButton = container.querySelector('#addTodoButton');
const todoLists = document.querySelector('#lists');
const messageElement = document.querySelector('#message');

// showMessage =====================================

const showMessage = (text,status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);

    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.classList.remove(`bg-${status}`)
    }, 1000);
}

// create Todo =====================================
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement('li');
    todoElement.id = todoId;
    todoElement.classList.add('li-style')
    todoElement.innerHTML = `
        <span>${todoValue}</span>
        <span><button class = "btn" id="deleteButton"><i class = "fa fa-trash"></i></button></span>
    `;

    const deleteButton = todoElement.querySelector('#deleteButton');
    
    deleteButton.addEventListener('click', deleteTodo)

    todoLists.appendChild(todoElement);
}

// deleteTodo function ==============================

const deleteTodo = (e) => {
    const selectedTodo = e.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);
    showMessage('Todo is Deleted', 'danger');


    // delted todo ==================================

    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);

    localStorage.setItem("mytodos", JSON.stringify(todos));
}

// getTodosFromLocalStorage==========================

const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
}


// addTodo function ================================

const addTodo = (e) => {
    e.preventDefault();
    const todoValue = todoInput.value;

    // unique id ===================================

    const todoId = Date.now().toString();
    
    createTodo(todoId,todoValue);
    showMessage('Todo is Added', 'success');

    // localStorage adding todo =====================

    const todos = getTodosFromLocalStorage();
    todos.push({todoId,todoValue});
    localStorage.setItem('mytodos', JSON.stringify(todos));

    todoInput.value = '' ;
}

// LoadTodos ========================================

const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
}

// adding listener =================================

todoForm.addEventListener('submit',addTodo )

window.addEventListener('DOMContentLoaded', loadTodos);


















