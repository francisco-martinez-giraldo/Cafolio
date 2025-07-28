# Tech Context - Cafolio

## Stack Tecnológico

### Frontend
- **Framework**: TanStack Start
- **UI**: Shadcn UI + Tailwind CSS
- **State**: Jotai (global) + React Query (server)
- **HTTP**: Axios
- **Forms**: React Hook Form + Zod

### Backend
- **Platform**: Supabase
- **Database**: PostgreSQL
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage (local images)

### Testing & Tools
- **Testing**: Jest
- **Docs**: Swagger/OpenAPI
- **Deploy**: Vercel (frontend)

## Configuraciones Clave
- TypeScript strict mode
- ESLint + Prettier
- Tailwind CSS v4
- Next.js 15+ con App Router

## Estructura de Base de Datos

### Tabla `dictionary`
```sql
id UUID PRIMARY KEY
type VARCHAR(50) -- 'brand', 'variety', 'process', 'method', 'temperature', 'ratio', 'grind'
value VARCHAR(100) -- Nombre a mostrar
image_url TEXT -- Imagen opcional
order_index INT -- Para ordenamiento
created_at TIMESTAMP
```

### Tabla `coffees`
```sql
id UUID PRIMARY KEY
user_id VARCHAR(100) -- FK a usuarios
brand_dictionary_id UUID -- FK a dictionary (brand)
variety_dictionary_id UUID -- FK a dictionary (variety)
process_dictionary_id UUID -- FK a dictionary (process)
photo_path TEXT -- Ruta de imagen local
region VARCHAR(100) -- Opcional
farm VARCHAR(100) -- Opcional
price NUMERIC(10,2) -- Opcional
notes TEXT -- Opcional
created_at TIMESTAMP
```

### Tabla `coffee_preparations`
```sql
id UUID PRIMARY KEY
user_id VARCHAR(100) -- FK a usuarios
coffee_id UUID -- FK a coffees
method_dictionary_id UUID -- FK a dictionary (method)
temperature_dictionary_id UUID -- FK a dictionary (temperature)
ratio_dictionary_id UUID -- FK a dictionary (ratio)
ranking NUMERIC(2,1) -- 0.0 a 5.0
notes JSONB -- Array de palabras
comments TEXT -- Comentarios adicionales
created_at TIMESTAMP
```

## Variables de Entorno
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Storage
SUPABASE_STORAGE_BUCKET=cafolio
```

## Scripts de Desarrollo
```json
{
  "dev": "next dev",
  "build": "next build",
  "test": "jest",
  "test:integration": "jest --config=jest.integration.config.js",
  "test:coverage": "jest --coverage"
}
```

## Configuración de Deploy
- **Frontend**: Vercel con Next.js
- **Backend**: Supabase (managed)
- **Storage**: Supabase Storage para imágenes
- **Auth**: Supabase Auth con RLS policies