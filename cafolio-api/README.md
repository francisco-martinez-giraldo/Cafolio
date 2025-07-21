# Cafolio API

API de prueba para gestión de portafolio de café siguiendo las especificaciones técnicas.

## Tecnologías

- **Backend:** TypeScript + Supabase
- **Framework:** Express.js
- **Testing:** Jest
- **Documentación:** Swagger/OpenAPI

## Instalación

```bash
cd api
npm install
```

## Configuración

1. Copia `.env.example` a `.env`
2. Configura las variables de Supabase:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

## Scripts

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Compilar TypeScript
- `npm test` - Ejecutar pruebas
- `npm start` - Ejecutar en producción

## Endpoints

### Autenticación

- `POST /api/auth/login` - Iniciar sesión o registrarse con magic link

### Cafés

- `GET /api/coffees/recent?user_id=email&limit=3` - Obtener cafés recientes
- `GET /api/coffees/:id?user_id=email` - Obtener café por ID
- `POST /api/coffees` - Crear nuevo café
- `PUT /api/coffees/:id` - Actualizar café
- `DELETE /api/coffees/:id` - Eliminar café

### Storage

- `POST /api/storage/upload` - Subir imagen de café
- `DELETE /api/storage/:fileName` - Eliminar imagen
- Almacenamiento de imágenes con Supabase Storage
- Soporte para formatos: JPG, PNG, WebP

### Diccionario

- `GET /api/dictionary?type=variety` - Obtener elementos del diccionario por tipo
- `GET /api/dictionary/types` - Obtener todos los tipos disponibles
- `POST /api/dictionary` - Crear nuevo elemento del diccionario
- `PUT /api/dictionary/:id` - Actualizar elemento del diccionario
- `DELETE /api/dictionary/:id` - Eliminar elemento del diccionario

### Tipos disponibles:

- `brand` - Marcas de café
- `variety` - Variedades de café
- `process` - Procesos de café
- `method` - Métodos de preparación
- `temperature` - Temperaturas
- `ratio` - Ratios de preparación
- `grind` - Tipos de molienda

## Documentación

Accede a la documentación interactiva en: `http://localhost:3000/api-docs`

## Funcionalidades Implementadas

### Autenticación

- Magic links para login/registro
- Gestión de usuarios con Supabase Auth

### Gestión de Cafés

- CRUD completo de cafés
- Almacenamiento de fotos localmente
- Relación con diccionarios (marca, variedad, proceso)
- Calificación general del café

### Sistema de Preparaciones

- Registro de métodos de preparación
- Calificación con medias estrellas (0.5 - 5.0)
- Notas predefinidas tipo chips
- Comentarios generales
- Parámetros: temperatura, ratio, molienda

### Diccionario Dinámico

- Tipos: brand, variety, process, method, temperature, ratio, grind
- Soporte para imágenes en elementos del diccionario
- Orden personalizable

## Estructura del Proyecto

```
cafolio-api/
├── src/
│   ├── config/          # Configuraciones (Supabase, Swagger)
│   ├── features/        # Módulos por característica
│   │   ├── auth/        # Autenticación con magic links
│   │   ├── coffees/     # Gestión de cafés
│   │   └── dictionary/  # Diccionario de datos
│   │   └── sorage/      # Subir imagenes tipo S3
│   └── types/           # Definiciones de tipos TypeScript
└── tests/               # Pruebas unitarias
```
