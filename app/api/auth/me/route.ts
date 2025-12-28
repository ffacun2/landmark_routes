import { getSession } from '@/lib/auth/session';
import { dbService } from '../../../../services/db.service';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

  const allUsers = await dbService.getAllUsers();
  const user = allUsers.find(u => u.id === session.userId);

  if (!user) return NextResponse.json({ message: 'No encontrado' }, { status: 401 });

  return NextResponse.json({ 
    user: { id: user.id, name: user.name, email: user.email } 
  });
}