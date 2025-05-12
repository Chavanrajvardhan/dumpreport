'use server';
 
import { cookies } from 'next/headers';
 
export async function logoutAction(): Promise<void> {

  const cookieStore = await cookies(); // DO NOT await this

  cookieStore.delete('token'); // Deletes the 'authToken' cookie
  cookieStore.delete('reportToken'); // Deletes the 'authToken' cookie
  cookieStore.delete('userId'); // Deletes the 'authToken' cookie
}

 