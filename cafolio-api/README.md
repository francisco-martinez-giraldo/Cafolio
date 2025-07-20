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

## Estructura del Proyecto

```
cafolio-api/
├── src/
│   ├── config/          # Configuraciones
│   ├── features/        # Módulos por característica
│   │   └── dictionary/  # Funcionalidad del diccionario
│   └── types/           # Definiciones de tipos
└── tests/               # Pruebas unitarias
```