export interface Landmark {
    id: string
    name: string
    description: string
    lat: number
    lng: number
    order: number
  }
  
  export interface Route {
    id: string
    name: string
    author: string
    authorId: string
    landmarks: Landmark[]
    createdAt: string
  }

  export interface NewRouteData {
    name: string;
    author: string | undefined;
    authorId: string | undefined;
    landmarks: Landmark[];
  }
  
  export interface TravelRoute extends NewRouteData {
    id: string;
    createdAt: string;
  }