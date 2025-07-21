# Cafolio - Documentación Técnica

## Stack Tecnológico

### Frontend
- **Framework:** TanStack Start
  - Enrutamiento basado en archivos
  - React Server Components
  - Integración con características modernas de React
- **Componentes UI:** Shadcn UI (ChadSN)
  - Componentes React accesibles y personalizables
  - Estilizados con Tailwind CSS
- **Estilos:** Tailwind CSS
  - Framework CSS utility-first para diseño rápido y responsivo
- **Fetching de Datos:** React Query
  - Manejo de datos remotos, caché y sincronización en segundo plano
- **Cliente HTTP:** Axios
  - Cliente HTTP basado en promesas para comunicación con API
- **Gestión de Estado:** Jotai
  - Gestión de estado atómica para manejo granular de estado local y global

### Backend
- **Lenguaje:** TypeScript
  - Garantiza seguridad de tipos y consistencia en el código
- **Plataforma Backend:** Supabase
  - Base de datos PostgreSQL
  - Autenticación incorporada
  - APIs REST/GraphQL
  - Características en tiempo real
  - Almacenamiento de archivos
- **Testing:** Jest
  - Para pruebas unitarias y de integración de lógica backend y APIs
- **Documentación API:** Swagger (OpenAPI)
  - Genera documentación interactiva para todos los endpoints de API

## Modelos de Datos

### Usuario
- `id`: string (UUID)
- `email`: string
- `created_at`: timestamp

### Marca de Café
- `id`: string (UUID)
- `brand`: string
- `variety`: string
- `process`: string
- `photo_path`: string
- `region`: string (opcional)
- `farm`: string (opcional)
- `notes`: string (opcional)
- `user_id`: string (UUID, referencia a Usuario)
- `created_at`: timestamp
- `last_used_at`: timestamp

### Preparación
- `id`: string (UUID)
- `coffee_id`: string (UUID, referencia a Marca de Café)
- `method`: string
- `temperature`: string
- `ratio`: string
- `grind`: string
- `notes`: string (opcional)
- `date`: timestamp
- `rating`: number (0.0 a 5.0 en incrementos de 0.5)
- `user_id`: string (UUID, referencia a Usuario)

### Diccionario (Valores Predefinidos)
- `id`: string (UUID)
- `type`: string (brand, variety, process, method, temperature, ratio, grind)
- `value`: string
- `order`: number

## Endpoints API

### Autenticación
- `POST /auth/login`: Iniciar sesión con email y contraseña
- `POST /auth/register`: Registrar nuevo usuario
- `POST /auth/logout`: Cerrar sesión
- `GET /auth/me`: Obtener información del usuario actual

### Marcas de Café
- `GET /coffees`: Obtener todas las marcas de café del usuario
- `GET /coffees/recent`: Obtener las 3 marcas más recientes
- `GET /coffees/:id`: Obtener detalles de una marca específica
- `POST /coffees`: Crear nueva marca de café
- `PUT /coffees/:id`: Actualizar marca existente
- `DELETE /coffees/:id`: Eliminar marca

### Preparaciones
- `GET /coffees/:id/preparations`: Obtener todas las preparaciones de una marca
- `POST /coffees/:id/preparations`: Añadir nueva preparación
- `PUT /coffees/:id/preparations/:prepId`: Actualizar preparación
- `DELETE /coffees/:id/preparations/:prepId`: Eliminar preparación

### Diccionario
- `GET /dictionary/:type`: Obtener valores predefinidos por tipo

## Flujo de Autenticación

1. Usuario ingresa email y contraseña
2. Frontend envía credenciales a Supabase Auth
3. Supabase valida y devuelve token JWT
4. Frontend almacena token en localStorage
5. Todas las solicitudes posteriores incluyen el token en el encabezado Authorization
6. Backend valida token en cada solicitud

## Almacenamiento de Imágenes

En la versión MVP, las imágenes se almacenan localmente:
1. Usuario selecciona o captura imagen
2. Frontend convierte imagen a formato adecuado
3. Imagen se guarda en almacenamiento local del dispositivo
4. Ruta de la imagen se almacena en la base de datos

## Validaciones

### Marca de Café
- Nombre: mínimo 3 caracteres, único para el usuario
- Variedad: requerido, de lista predefinida
- Proceso: requerido, de lista predefinida
- Foto: requerida, una sola imagen

### Preparación
- Método: requerido, de lista predefinida
- Temperatura: requerido, de lista predefinida
- Ratio: requerido, de lista predefinida
- Molienda: requerido, de lista predefinida
- Calificación: requerido, entre 0 y 5 en incrementos de 0.5

## Consideraciones de Seguridad

- Autenticación mediante Supabase Auth
- Políticas RLS (Row Level Security) en Supabase para garantizar que los usuarios solo accedan a sus propios datos
- Validación de datos tanto en frontend como en backend
- Sanitización de entradas para prevenir inyecciones SQL y XSS

## Estructura de Carpetas Recomendada

```
src/
├── app/                    # Rutas de la aplicación
│   ├── (authenticated)/    # Rutas protegidas
│   │   ├── home/           # Pantalla de inicio
│   │   ├── coffee/         # Detalle de marca
│   │   │   └── [id]/       # Ruta dinámica para ID de marca
│   │   └── new-coffee/     # Añadir nueva marca
│   └── login/              # Pantalla de login
├── components/             # Componentes reutilizables
│   ├── ui/                 # Componentes de UI básicos
│   ├── coffee/             # Componentes específicos de café
│   └── preparation/        # Componentes de preparación
├── hooks/                  # Hooks personalizados
├── lib/                    # Utilidades y configuración
├── services/               # Servicios de API
└── types/                  # Definiciones de tipos
```

## Convenciones de Código

- Utilizar TypeScript para todo el código
- Seguir principios de componentes atómicos
- Mantener componentes pequeños y enfocados
- Utilizar hooks personalizados para lógica reutilizable
- Seguir patrones de diseño React modernos (hooks, context)
- Implementar manejo de errores consistente
- Documentar funciones y componentes principales