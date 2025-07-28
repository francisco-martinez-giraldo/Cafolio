# API Specifications - Cafolio

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

### Storage
- `POST /storage/upload`: Subir imagen de marca de café

## Flujo de Autenticación
1. Usuario ingresa email y contraseña
2. Frontend envía credenciales a Supabase Auth
3. Supabase valida y devuelve token JWT
4. Frontend almacena token en localStorage
5. Todas las solicitudes posteriores incluyen el token en el encabezado Authorization
6. Backend valida token en cada solicitud

## Almacenamiento de Imágenes
1. Usuario selecciona o captura imagen
2. Frontend envía imagen via FormData a `/storage/upload`
3. Backend procesa con multer y guarda en Supabase Storage
4. Se retorna URL pública de la imagen
5. URL se almacena en la base de datos

## Validaciones

### Marca de Café
- Nombre: mínimo 3 caracteres, único para el usuario
- Variedad: requerido, de lista predefinida
- Proceso: requerido, de lista predefinida
- Foto: requerida, una sola imagen (max 5MB)

### Preparación
- Método: requerido, de lista predefinida
- Temperatura: requerido, de lista predefinida
- Ratio: requerido, de lista predefinida
- Molienda: requerido, de lista predefinida
- Calificación: requerido, entre 0 y 5 en incrementos de 0.5

## Consideraciones de Seguridad
- Autenticación mediante Supabase Auth
- Políticas RLS (Row Level Security) en Supabase
- Validación de datos tanto en frontend como en backend
- Sanitización de entradas para prevenir inyecciones SQL y XSS
- Validación de tipos de archivo en uploads (solo imágenes)