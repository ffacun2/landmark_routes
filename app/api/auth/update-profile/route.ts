import { NextResponse } from 'next/server';
import { authService } from '@/services/auth/auth.service';
import { getSession } from '@/lib/auth/session'; // Tu lógica de sesión/cookies

export async function PUT(req: Request) {
  try {
    const session = await getSession(); // Obtener ID del usuario desde la cookie/JWT
    if (!session) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

    const body = await req.json();
    const updatedUser = await authService.update(session , body);

    return NextResponse.json({ 
      message: "Perfil actualizado", 
      user: updatedUser 
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}