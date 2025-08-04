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

## 🛠️ PLAN DE MIGRACIÓN: EXPRESS API → NEXT.JS API ROUTES

### 🎯 Objetivo
Migrar `cafolio-api` (Express + Swagger) a Next.js API Routes dentro de `cafolio-app` para deploy unificado.

### 📋 Fases de Migración

#### **FASE 1: Preparación y Setup**
1. **Crear estructura de API en cafolio-app**
   ```
   cafolio-app/src/app/api/
   ├── auth/
   │   ├── login/route.ts
   │   ├── register/route.ts
   │   ├── logout/route.ts
   │   └── me/route.ts
   ├── coffees/
   │   ├── route.ts (GET, POST)
   │   ├── recent/route.ts
   │   └── [id]/
   │       ├── route.ts (GET, PUT, DELETE)
   │       └── preparations/
   │           ├── route.ts (GET, POST)
   │           └── [prepId]/route.ts
   ├── coffee-preparations/
   │   └── history/
   │       └── [coffeeId]/route.ts
   ├── dictionary/
   │   └── [type]/route.ts
   └── storage/
       └── upload/route.ts
   ```

2. **Migrar configuración y tipos**
   - Mover `src/config/supabase.ts` a `cafolio-app/src/lib/supabase-server.ts`
   - Migrar `src/types/index.ts` a `cafolio-app/src/types/api.ts`
   - Actualizar variables de entorno en `cafolio-app/.env.local`

#### **FASE 2: Migración de Servicios**
3. **Migrar lógica de negocio**
   ```
   cafolio-app/src/lib/services/
   ├── auth-service.ts
   ├── coffee-service.ts
   ├── coffee-preparations-service.ts
   ├── dictionary-service.ts
   └── storage-service.ts
   ```
   - Convertir controllers de Express a funciones puras
   - Mantener la misma lógica de validación con Zod
   - Preservar manejo de errores y responses

4. **Migrar middleware y utilidades**
   ```
   cafolio-app/src/lib/middleware/
   ├── auth-middleware.ts
   ├── error-handler.ts
   └── validation.ts
   ```

#### **FASE 3: Implementación de API Routes**
5. **Crear API Routes por módulo**
   - **Auth**: 4 endpoints (login, register, logout, me)
   - **Coffees**: 6 endpoints (CRUD + recent + preparations)
   - **Coffee Preparations**: 4 endpoints (CRUD + history)
   - **Dictionary**: 1 endpoint (get by type)
   - **Storage**: 1 endpoint (upload)

6. **Patrón de implementación por endpoint**
   ```typescript
   // Ejemplo: app/api/coffees/route.ts
   import { NextRequest, NextResponse } from 'next/server'
   import { coffeeService } from '@/lib/services/coffee-service'
   import { authMiddleware } from '@/lib/middleware/auth-middleware'
   
   export async function GET(request: NextRequest) {
     try {
       const user = await authMiddleware(request)
       const coffees = await coffeeService.getAllByUser(user.id)
       return NextResponse.json(coffees)
     } catch (error) {
       return NextResponse.json({ error: error.message }, { status: 500 })
     }
   }
   ```

#### **FASE 4: Migración de Tests**
7. **Adaptar tests existentes**
   ```
   cafolio-app/tests/api/
   ├── auth.test.ts
   ├── coffees.test.ts
   ├── coffee-preparations.test.ts
   ├── dictionary.test.ts
   └── storage.test.ts
   ```
   - Cambiar de `supertest` a `@testing-library/react` + `msw`
   - Mantener misma cobertura de pruebas (100%)
   - Adaptar mocks para Next.js API Routes

#### **FASE 5: Documentación y Limpieza**
8. **Reemplazar Swagger con alternativa Next.js**
   - Evaluar `next-swagger-doc` o documentación manual
   - Mantener especificaciones OpenAPI existentes
   - Generar docs automáticas desde tipos TypeScript

9. **Actualización de servicios frontend**
   - Cambiar base URL de API calls de `localhost:3001` a `/api`
   - Verificar que todos los servicios funcionen correctamente
   - Mantener misma interfaz de servicios existente

10. **Limpieza final**
    - Eliminar carpeta `cafolio-api/` completa
    - Actualizar scripts de package.json
    - Actualizar README y documentación

### 📅 Estimación de Tiempo
- **Fase 1-2**: 2-3 horas (setup y migración de servicios)
- **Fase 3**: 3-4 horas (implementación de 16 endpoints)
- **Fase 4**: 2 horas (migración de tests)
- **Fase 5**: 1-2 horas (docs y limpieza)
- **Total**: 8-11 horas de trabajo

### ⚠️ Riesgos y Consideraciones
1. **Compatibilidad de middleware**: Next.js maneja middleware diferente a Express
2. **File uploads**: Adaptar multer a Next.js FormData handling
3. **Error handling**: Ajustar responses para cumplir estándares Next.js
4. **Environment variables**: Sincronizar variables entre proyectos
5. **Testing**: Cambio significativo en approach de testing

### ✅ Beneficios Esperados
- 🚀 **Deploy unificado**: Una sola aplicación en Vercel
- 💰 **Costo reducido**: Eliminar servidor separado para API
- 🔧 **Mantenimiento simplificado**: Un solo proyecto
- ⚡ **Performance**: API co-located con frontend
- 🔒 **Seguridad**: Mejor integración con Next.js auth patterns

### 📋 Checklist de Validación Post-Migración
- [ ] Todos los endpoints responden correctamente
- [ ] Tests pasan al 100%
- [ ] Frontend funciona sin cambios
- [ ] File uploads funcionan
- [ ] Autenticación funciona
- [ ] Variables de entorno configuradas
- [ ] Documentación actualizada
- [ ] Deploy exitoso en Vercel

## 🎯 Estado Técnico Actual
- ✅ Base de datos actualizada con grind
- ✅ APIs funcionando con nuevos campos
- ✅ Frontend sincronizado con backend
- ✅ Tests pasando al 100%
- ✅ UI optimizada con Shadcn
- ✅ Código limpio y mantenible
- 📋 **Plan de migración API documentado y listo**