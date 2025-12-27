import { NextRequest, NextResponse } from 'next/server'
import { getRoute, updateRoute, deleteRoute } from '@/lib/routes-storage'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const route = await getRoute(id);

    if (!route) {
      return NextResponse.json(
        { error: 'Route not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(route);
  } 
  catch (error) {
    console.error('Error fetching route:', error);

    return NextResponse.json(
      { error: 'Failed to fetch route' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updates = await request.json();

    const updated = await updateRoute(id, updates);

    if (!updated) {
      return NextResponse.json(
        { error: 'Route not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } 
  catch (error) {
    console.error('Error updating route:', error);
    return NextResponse.json(
      { error: 'Failed to update route' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params; 
    
    const success = await deleteRoute(id);
    
    if (!success) {
      return NextResponse.json(
        { message: "La ruta no existe o no pudo ser eliminada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Ruta eliminada correctamente" });
  } 
  catch (error) {
    console.error("Error en API DELETE:", error);
    return NextResponse.json({ message: "Error al eliminar" }, { status: 500 });
  }
}
