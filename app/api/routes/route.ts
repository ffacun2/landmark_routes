import { NextRequest, NextResponse } from 'next/server'
import { saveRoute, getAllRoutes } from '@/lib/routes-storage'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const allRoutes = await getAllRoutes()
    const userRoutes = allRoutes.filter(route => route.authorId === userId)

    return NextResponse.json({ routes: userRoutes }, { status: 200 })
  } catch (error) {
    console.error('Error fetching routes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch routes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.landmarks || body.landmarks.length < 2) {
      return NextResponse.json(
        { message: "Datos de ruta incompletos" }, 
        { status: 400 }
      );
    }

    const newRoute = {
      ...body,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    const saved = await saveRoute(newRoute)
    return NextResponse.json({ routeId: saved.id }, { status: 201 })
  } 
  catch (error) {
    console.error('Error creating route:', error)
    return NextResponse.json(
      { error: 'Failed to create route' },
      { status: 500 }
    )
  }
}
