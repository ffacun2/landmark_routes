import fs from 'fs/promises'
import path from 'path'

interface Landmark {
  id: string
  name: string
  description: string
  lat: number
  lng: number
  order: number
}

interface Route {
  id: string
  name: string
  author: string
  authorId: string
  landmarks: Landmark[]
  createdAt: string
}

const ROUTES_DIR = path.join(process.cwd(), 'data', 'routes')

// Ensure routes directory exists
async function ensureRoutesDir() {
  try {
    await fs.mkdir(ROUTES_DIR, { recursive: true })
  } catch (error) {
    console.error('Error creating routes directory:', error)
  }
}

export async function getAllRoutes(): Promise<Route[]> {
  try {
    await ensureRoutesDir()
    const files = await fs.readdir(ROUTES_DIR)
    const routes: Route[] = []

    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = await fs.readFile(path.join(ROUTES_DIR, file), 'utf-8')
        routes.push(JSON.parse(content))
      }
    }

    return routes
  } catch (error) {
    console.error('Error reading routes:', error)
    return []
  }
}

export async function getRoute(id: string): Promise<Route | null> {
  try {

    const cleanId = id.trim(); 
    await ensureRoutesDir();
    const filePath = path.join(ROUTES_DIR, `${cleanId}.json`);

    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error: any) {
    
    if (error.code === 'ENOENT') {
      console.warn(`Route not found (ENOENT) for ID: ${id}`);
      return null; // Devuelve null para que el API handler devuelva 404
    }

    // Si es cualquier otro error (permiso, JSON mal formado, etc.), loguea y devuelve null
    console.error('CRITICAL Error reading route:', error); 
    return null;
  }
}

export async function saveRoute(route: Route): Promise<Route> {
  try {
    await ensureRoutesDir()
    const filePath = path.join(ROUTES_DIR, `${route.id}.json`)
    await fs.writeFile(filePath, JSON.stringify(route, null, 2))
    return route
  } catch (error) {
    console.error('Error saving route:', error)
    throw new Error('Failed to save route')
  }
}

export async function deleteRoute(id: string): Promise<boolean> {
  try {
    await ensureRoutesDir()
    const filePath = path.join(ROUTES_DIR, `${id}.json`)
    await fs.unlink(filePath)
    return true
  } catch (error) {
    console.error('Error deleting route:', error)
    return false
  }
}

export async function updateRoute(id: string, updates: Partial<Route>): Promise<Route | null> {
  try {
    const existing = await getRoute(id)
    if (!existing) return null

    const updated = { ...existing, ...updates }
    return await saveRoute(updated)
  } catch (error) {
    console.error('Error updating route:', error)
    return null
  }
}
