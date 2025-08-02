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

### Tabla `coffee_preparations` ✅ ACTUALIZADA
```sql
id UUID PRIMARY KEY
user_id VARCHAR(100) -- FK a usuarios
coffee_id UUID -- FK a coffees
method_dictionary_id UUID -- FK a dictionary (method)
temperature_dictionary_id UUID -- FK a dictionary (temperature)
ratio_dictionary_id UUID -- FK a dictionary (ratio)
grind_dictionary_id UUID -- FK a dictionary (grind) ✅ AGREGADO
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

## ✅ Migraciones Aplicadas

### Migración: Campo Grind (2025-08-02)
```sql
-- Agregar columna grind_dictionary_id
ALTER TABLE coffee_preparations 
ADD COLUMN grind_dictionary_id UUID;

-- Agregar constraint FK
ALTER TABLE coffee_preparations 
ADD CONSTRAINT fk_grind_dictionary 
FOREIGN KEY (grind_dictionary_id) REFERENCES dictionary(id);

-- Actualizar registros existentes con valor por defecto
UPDATE coffee_preparations 
SET grind_dictionary_id = (
  SELECT id FROM dictionary 
  WHERE type = 'grind' AND value = 'Media' 
  LIMIT 1
) 
WHERE grind_dictionary_id IS NULL;

-- Hacer columna NOT NULL
ALTER TABLE coffee_preparations 
ALTER COLUMN grind_dictionary_id SET NOT NULL;
```

## ✅ Endpoints API Actualizados

### Coffee Preparations
- `GET /api/coffee-preparations/history/{coffeeId}` - ✅ NUEVO
  - Retorna preparaciones ordenadas por `created_at DESC`
  - Incluye JOIN con dictionary para grind
  - Filtrado por coffee_id y user_id

### Tipos TypeScript Sincronizados
```typescript
// ✅ ACTUALIZADO
interface CoffeePreparation {
  grind_dictionary_id: string;
  grind?: DictionaryItem;
  // ... otros campos
}

interface CreateCoffeePreparationRequest {
  grind_dictionary_id: string;
  // ... otros campos
}
```

## ✅ Componentes UI Optimizados

### Shadcn Components Utilizados
- `Card` + `CardContent` - Tarjetas de preparación
- `Badge` - Notas individuales (variant="secondary")
- `Button` - Navegación y acciones
- `Star` - Calificaciones visuales

### Tokens Semánticos Aplicados
- `bg-background` - Fondo principal
- `bg-card` - Fondos de tarjetas
- `text-foreground` - Texto principal
- `text-muted-foreground` - Texto secundario
- `border-b` - Separadores sutiles

### Layout Patterns
- `justify-between` - Distribución uniforme de campos
- `mx-6` - Alineación consistente
- `gap-*` - Espaciado moderno
- `flex-wrap` - Responsive design

## 🎯 Estado Técnico Actual
- ✅ Base de datos actualizada con grind
- ✅ APIs funcionando con nuevos campos
- ✅ Frontend sincronizado con backend
- ✅ Tests pasando al 100%
- ✅ UI optimizada con Shadcn
- ✅ Código limpio y mantenible