const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    return;
  }

  addTodoItem(text);
  todoInput.value = '';
  todoInput.focus();
});

function addTodoItem(text) {
  const item = document.createElement('li');
  item.className = 'todo-item';

  const label = document.createElement('p');
  label.className = 'todo-text';
  label.textContent = text;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    item.remove();
  });

  item.append(label, deleteButton);
  todoList.appendChild(item);
}
