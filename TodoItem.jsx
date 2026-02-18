export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className={todo.completed ? "completed" : ""}>
      <span>{todo.text}</span>

      <div className="actions">
        <button
          className="toggle"
          onClick={() => toggleTodo(todo.id)}
        >
          ✓
        </button>

        <button
          className="delete"
          onClick={() => deleteTodo(todo.id)}
        >
          ✕
        </button>
      </div>
    </li>
  );
}