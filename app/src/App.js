import { useState } from 'react';
import Button from './Button';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Plan the day', done: false },
    { id: 2, title: 'Check emails', done: false },
  ]);
  const [input, setInput] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editInput, setEditInput] = useState('');

  function addTask(event) {
    event.preventDefault();
    const title = input.trim();

    if (!title || tasks.length >= 10) return;

    setTasks((current) => [
      ...current,
      { id: Date.now(), title, done: false },
    ]);
    setInput('');
  }

  function startEditing(task) {
    setEditingTaskId(task.id);
    setEditInput(task.title);
  }

  function saveEdit(event, id) {
    event.preventDefault();
    const title = editInput.trim();

    if (!title) return;

    setTasks((current) => current.map((task) =>
      task.id === id ? { ...task, title } : task
    ));
    setEditingTaskId(null);
    setEditInput('');
  }

  function cancelEdit() {
    setEditingTaskId(null);
    setEditInput('');
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
    if (editingTaskId === id) cancelEdit();
  }

  const completed = tasks.filter((task) => task.done).length;

  return (
    <main className="todo-page">
      <section className="todo-card" aria-labelledby="todo-title">
        <p className="eyebrow">YOUR DAY, IN ORDER</p>
        <h1 id="todo-title">Things to do</h1>
        <p className="subtitle">A little progress goes a long way.</p>

        <form className="add-form" onSubmit={addTask}>
          <label className="sr-only" htmlFor="new-task">New task</label>
          <input
            id="new-task"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="What needs doing?"
          />
          <Button
            type="submit"
            symbol="+"
            disabled={tasks.length >= 10}
          >
            {tasks.length >= 10 ? 'List is full' : 'Add task'}
          </Button>
        </form>

        <div className="list-heading">
          <h2>Today</h2>
          <span>{completed} of {tasks.length} done</span>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-state">Your list is clear. Add a task to get started.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li className={`task${task.done ? ' task-done' : ''}`} key={task.id}>
                {editingTaskId === task.id ? (
                  <form
                    className="edit-form"
                    onSubmit={(event) => saveEdit(event, task.id)}
                  >
                    <label className="sr-only" htmlFor={`edit-task-${task.id}`}>
                      Edit {task.title}
                    </label>
                    <input
                      id={`edit-task-${task.id}`}
                      value={editInput}
                      onChange={(event) => setEditInput(event.target.value)}
                      autoFocus
                    />
                    <Button type="submit" disabled={!editInput.trim()}>
                      Save
                    </Button>
                    <Button type="button" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </form>
                ) : (
                  <div className="task-content">
                    <label className="task-label">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                        disabled={tasks.length >= 3}
                      />
                      <span>{task.title}</span>
                    </label>
                    <div className="task-actions">
                      <Button
                        className="edit-button"
                        type="button"
                        onClick={() => startEditing(task)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="delete-button"
                        type="button"
                        aria-label={`Delete ${task.title}`}
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
