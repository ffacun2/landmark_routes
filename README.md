# RouteMapper

RouteMapper es una plataforma de gestión de itinerarios turísticos construida con Next.js **15 (App Router)**. Permite diseñar rutas interactivas, gestionar puntos de interés (landmarks) y persistir datos de forma segura mediante una arquitectura basada en servicios.

## Características Principales
- **Mapeo Interactivo:** Integración de Leaflet + OpenStreetMap para la colocación y visualización de rutas en tiempo real.

- **Búsqueda Inteligente:** Localización de puntos de interés mediante el geocodificador Nominatim, autocompletando nombres y descripciones.

- **Gestión de Itinerarios:** CRUD completo de rutas y landmarks con sincronización automática de la polilínea del mapa.

- **Autenticación y Sesión:** Seguridad basada en JWT (JSON Web Tokens) con cifrado de cookies y gestión de sesión en el lado del servidor.

- **Perfil de Usuario:** Edición de datos personales con persistencia y encriptación de contraseñas mediante bcrypt.

- **Persistencia Local:** Almacenamiento basado en archivos JSON (data/routes/ y data/users/) que actúa como una base de datos documental ligera.

## Arquitectura Técnica
La aplicación implementa una separación de responsabilidades estricta para garantizar la escalabilidad:

- **Capa de UI:** Componentes React reutilizables (RouteEditor, MapComponent).

- **Capa de Lógica (Hooks):** Hooks unificados (useTrip) que centralizan la gestión de estados y efectos.

- **Capa de Servicios:**

    - **Cliente:** authClient y tripService manejan la comunicación de red (fetch).

    - **Servidor:** authService y userService procesan la lógica de negocio y seguridad.

- **Capa de Datos:** db.services.ts interactúa directamente con el sistema de archivos mediante fs/promises.

## Seguridad y Middleware
La aplicación cuenta con un Middleware de Next.js que actúa como guardián de acceso a nivel de infraestructura:

- **Protección de Rutas:** Filtra el acceso a rutas privadas (/dashboard, /profile, /create-route) verificando la validez del JWT antes de que la petición llegue a las páginas.

- **Redirección Inteligente:** Los usuarios no autenticados son redirigidos automáticamente al Login al intentar acceder a áreas protegidas.

- **Validación de Sesión:** Implementa getSession mediante jwtVerify para asegurar que el token de la cookie session no haya sido manipulado.

## Instalación y Configuración
1. **Clonar e Instalar:**

```
git clone https://github.com/tu-usuario/routemapper.git
cd routemapper
pnpm install
```
2. **Variables de Entorno:** Crea un archivo ``.env`` en la raíz (para la clave secreta del JWT):


```
JWT_SECRET=tu_clave_secreta_super_segura
```
3. **Ejecutar:**
```
pnpm dev
```
