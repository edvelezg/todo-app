const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const themeToggle = document.getElementById('theme-toggle');

const themeKey = 'todo-app-theme';

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  themeToggle.textContent = isDark ? 'Switch to light' : 'Switch to dark';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

function saveTheme(theme) {
  localStorage.setItem(themeKey, theme);
}

function initTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  saveTheme(nextTheme);
});

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

  label.addEventListener('click', () => {
    label.classList.toggle('completed');
  });

  item.append(label, deleteButton);
  todoList.appendChild(item);
}

initTheme();
