
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');


const getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];

const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos));


function renderData() {
  const todos = getTodos();
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.done ? 'done' : '';
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        ${
          todo.done
            ? '<button onclick="deleteTodo(' + index + ')">Delete</button>'
            : `
            <button onclick="editTodo(${index})">Edit</button>
            <button onclick="markDone(${index})">Done</button>
            <button onclick="deleteTodo(${index})">Delete</button>
          `
        }
      </div>
    `;
    todoList.appendChild(li);
  });
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  const todos = getTodos();
  todos.push({ text, done: false });
  saveTodos(todos);
  renderData();
  todoForm.reset();
});


function deleteTodo(index) {
  const todos = getTodos();
  todos.splice(index, 1);
  saveTodos(todos);
  renderData();
}


function editTodo(index) {
  const todos = getTodos();
  const todoText = prompt('Edit your task:', todos[index].text);
  if (todoText === null || todoText.trim() === '') return;

  todos[index].text = todoText.trim();
  saveTodos(todos);
  renderData();
}


function markDone(index) {
  const todos = getTodos();
  todos[index].done = true;
  saveTodos(todos);
  renderData();
}


renderData();
