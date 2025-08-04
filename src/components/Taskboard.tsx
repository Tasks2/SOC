// Example usage in src/components/TaskBoard.tsx or App.tsx
import { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask, updateTask } from 'backend/src/api/tasks';

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', category: '' });

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createTask(form);
    await loadTasks();
    setForm({ title: '', date: '', category: '' });
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    await loadTasks();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            {task.title} – {task.date} – {task.category}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskBoard;
