const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const addBtn = document.getElementById("addBtn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save todos
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render todos
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "✓";
    toggleBtn.className = "toggle";
    toggleBtn.addEventListener("click", () => toggleTodo(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.className = "delete";
    deleteBtn.addEventListener("click", () => deleteTodo(index));

    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    todoList.appendChild(li);
  });
}

// Add todo
function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  todos.push({ text, completed: false });
  todoInput.value = "";
  saveTodos();
  renderTodos();
}

// Toggle todo
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Events
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

// Initial load
renderTodos();



