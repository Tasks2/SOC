// src/api/tasks.ts
const API_URL = 'http://localhost:3001/api/tasks';

export async function getTasks() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createTask(task: {
  title: string;
  date: string;
  category: string;
}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function deleteTask(id: number) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

export async function updateTask(id: number, task: {
  title: string;
  date: string;
  category: string;
}) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return res.json();
}
