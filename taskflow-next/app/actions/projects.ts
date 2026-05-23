'use server';
import { revalidatePath } from 'next/cache';

const API_URL = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/projects`;

export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });

  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = formData.get('id') as string;
  const newName = formData.get('newName') as string;

  // First fetch to get existing data (like color)
  const res = await fetch(`${API_URL}/${id}`);
  const project = await res.json();

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...project, name: newName }),
  });

  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;

  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  revalidatePath('/dashboard');
}
