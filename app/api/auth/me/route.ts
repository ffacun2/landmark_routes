import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth/session';
import { dbService } from '../../../../services/db.service';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;
  const session = await decrypt(sessionToken);

  if (!session?.userId) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  const allUsers = await dbService.getAllUsers();
  const user = allUsers.find(u => u.id === session.userId);

  if (!user) return NextResponse.json({ message: 'No encontrado' }, { status: 401 });

  return NextResponse.json({ 
    user: { id: user.id, name: user.name, email: user.email } 
  });
}