'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

function readUsers() {
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  return db.users;
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const users = readUsers();
  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) {
    return { error: 'Email ou mot de passe incorrect' };
  }

  const cookieStore = await cookies();
  cookieStore.set('session', JSON.stringify({
    email: user.email, name: user.name, role: 'admin'
  }), {
    httpOnly: true,
    secure: false, // Set to true in production
    maxAge: 3600,
    path: '/',
  });

  redirect('/dashboard');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}
