import { LoginSchema } from '@/lib/auth/definitions';
import { authService } from '@/services/auth.service';
import { createSession } from '@/lib/auth/session';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = LoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ message: 'Datos inválidos' }, { status: 400 });
    }
    
    const user = await authService.login(validated.data);
    
    if (!user) {
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });
    }
 
    await createSession(user?.id);
    
    return NextResponse.json({ message: 'Login exitoso', user });
  } catch (error) {
    return NextResponse.json({ message: 'Error en el servidor', error }, { status: 500 });
  }
}