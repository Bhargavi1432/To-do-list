const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");

const STORAGE_KEY = "todos";

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];

/* ---------- Utils ---------- */

const saveTodos = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

const createTodo = (text) => ({
  id: crypto.randomUUID(),
  text,
  completed: false
});

/* ---------- Render ---------- */

const renderTodos = () => {
  todoList.innerHTML = "";

  todos.forEach(({ id, text, completed }) => {
    const li = document.createElement("li");
    li.dataset.id = id;
    li.classList.toggle("completed", completed);

    li.innerHTML = `
      <span>${text}</span>
      <div class="actions">
        <button class="toggle">✓</button>
        <button class="delete">✕</button>
      </div>
    `;

    todoList.appendChild(li);
  });
};

/* ---------- Actions ---------- */

const addTodo = () => {
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push(createTodo(text));
  todoInput.value = "";

  saveTodos();
  renderTodos();
};

const toggleTodo = (id) => {
  todos = todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  );

  saveTodos();
  renderTodos();
};

const deleteTodo = (id) => {
  todos = todos.filter(todo => todo.id !== id);

  saveTodos();
  renderTodos();
};

const clearTodos = () => {
  todos = [];
  localStorage.removeItem(STORAGE_KEY);
  renderTodos();
};

/* ---------- Events ---------- */

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

clearBtn.addEventListener("click", clearTodos);

// Event delegation for toggle & delete
todoList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = li.dataset.id;

  if (e.target.classList.contains("toggle")) toggleTodo(id);
  if (e.target.classList.contains("delete")) deleteTodo(id);
});

/* ---------- Init ---------- */

renderTodos();

