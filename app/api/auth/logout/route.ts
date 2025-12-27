import { deleteSession } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await deleteSession();
    
    return NextResponse.json(
      { message: "Sesión cerrada correctamente" }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al cerrar sesión" }, 
      { status: 500 }
    );
  }
}