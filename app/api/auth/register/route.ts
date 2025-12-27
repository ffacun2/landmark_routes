import { RegisterSchema } from '@/lib/auth/definitions';
import { authService } from '@/services/auth.service';
import { createSession } from '@/lib/auth/session';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = RegisterSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ errors: validated.error.flatten() }, { status: 400 });
    }

    const user = await authService.register(validated.data);
    await createSession(user.id);

    return NextResponse.json({ message: 'Usuario creado', user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error en el servidor' }, { status: 500 });
  }
}