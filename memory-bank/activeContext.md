# Contexto Activo del Desarrollo - Cafolio

## 🎯 Estado Actual del Proyecto

### ✅ Funcionalidades Completamente Implementadas

#### 1. Sistema de Autenticación con Magic Links

- **Implementación:** Supabase Auth con OTP (One-Time Password)
- **Flujo:** Email → Magic Link → Callback → Autenticación automática
- **Archivos clave:**
  - `/api/auth/login/route.ts` - Endpoint para envío de magic links
  - `/auth/callback/page.tsx` - Procesamiento del callback de autenticación
  - `middleware.ts` - Protección de rutas con verificación de tokens
  - `AuthGuard.tsx` - Guard de componentes para rutas protegidas

#### 2. CRUD Completo de Cafés con Upload de Imágenes

- **Implementación:** Endpoint unificado que maneja FormData con imagen y datos del café
- **Flujo:** FormData → Upload a Supabase Storage → Creación de registro con URL pública
- **Archivos clave:**
  - `/api/coffees/route.ts` - POST endpoint que maneja FormData completo
  - `CoffeeForm.tsx` - Formulario que envía FormData para creación
  - `storage-service.ts` - Servicio que retorna URL pública de Supabase
- **Decisión técnica:** Un solo llamado API para imagen + datos (no dos llamados separados)

#### 3. Sistema de Storage Optimizado

- **Implementación:** Supabase Storage con URLs públicas
- **Patrón:** Upload → Obtener URL pública → Guardar URL en base de datos
- **Archivos clave:**
  - `StorageService.uploadImage()` - Retorna `publicUrl` además de datos de upload
  - `/api/storage/upload/route.ts` - Endpoint independiente (usado solo para edición)

### 🔧 Decisiones Técnicas Recientes

#### 0. REGLA DE ORO: HOOKS OBLIGATORIOS

- **NUNCA:** Importar servicios directamente en endpoints
- **NUNCA:** Usar `await import()` para servicios
- **SIEMPRE:** Crear hooks para cada operación
- **SIEMPRE:** Usar hooks en componentes/páginas
- **PATRÓN:** Frontend (hooks) → API (endpoints) → Servicios (datos)
- **VIOLACIÓN:** Refactor inmediato sin excusas

#### 1. Animaciones con Framer Motion

- **Decisión:** Usar Framer Motion para animaciones profesionales
- **Implementación:** `motion.div` + `AnimatePresence` para exit animations
- **Beneficios:** Animaciones suaves, optimistic updates, física natural
- **Patrón:** Eliminar → Animación inmediata → Optimistic update → Reversión si falla
- **Estado:** ✅ Implementado - Eliminación de preparaciones con efecto profesional

#### 2. Patrón OBLIGATORIO: React Query + Hooks

- **Decisión:** SIEMPRE usar React Query hooks para operaciones async
- **Razón:** Consistencia, manejo de estados, cache automático, retry logic
- **Patrón:** `useMutation` para operaciones, `useQuery` para consultas
- **Implementación:** Todos los servicios deben tener su hook correspondiente
- **Ejemplo:** `useDeleteImage()`, `useUploadImage()`, `useCreateCoffee()`
- **PROHIBIDO:** Imports directos de servicios en endpoints o componentes
- **PROHIBIDO:** `await import()` dinámicos en endpoints
- **CORRECTO:** Usar hooks en frontend, servicios simples en backend
- **Estado:** ✅ Patrón establecido - VIOLACIÓN = REFACTOR INMEDIATO

#### 2. Campo photo_id en Tabla Coffees

- **Decisión:** Agregar campo `photo_id` obligatorio a tabla coffees
- **Razón:** Identificador único para imágenes en Supabase Storage, separado de la URL pública
- **Implementación:** Campo TEXT NOT NULL, auto-generado por backend
- **Archivos afectados:** `api.ts` (tipos), `apiSpecs.md` (documentación)
- **Estado:** ✅ Completado - Migration SQL + tipos frontend actualizados

#### 2. Manejo de Errores Mejorado

- **Cambio:** Eliminación de tipos `any` en catch blocks
- **Implementación:** Type guards con `error instanceof Error`
- **Patrón:** `error instanceof Error ? error.message : 'Error desconocido'`

#### 2. Autenticación Simplificada

- **Cambio:** Callback de auth simplificado sin procesamiento complejo de URLs
- **Implementación:** `getSession()` directo + redirección con `window.location.href`
- **Razón:** Mayor confiabilidad que `useRouter` en contextos de autenticación

#### 3. FormData para Creación de Cafés

- **Decisión:** Usar FormData solo para creación, JSON para edición
- **Implementación:**
  - Creación: `FormData` → `/api/coffees` (maneja imagen + datos)
  - Edición: JSON → `/api/coffees/[id]` + upload separado si hay nueva imagen
- **Beneficio:** Un solo request para creación completa

### 🚨 Problemas Resueltos Recientemente

#### 1. Error de photo_path null

- **Problema:** Campo `photo_path` llegaba como null causando constraint violation
- **Solución:** Endpoint unificado que garantiza URL de imagen antes de crear registro
- **Implementación:** Upload → `publicUrl` → Creación con `photo_path` válido

#### 2. Content-Type Headers

- **Problema:** FormData no se enviaba con headers correctos
- **Solución:** Configuración condicional de headers en `coffeesService.create()`
- **Implementación:** `coffee instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}`

#### 3. AuthGuard Bloqueando Callback

- **Problema:** `/auth/callback` no estaba en rutas públicas del AuthGuard
- **Solución:** Agregado `/auth/callback` a `publicPaths` array
- **Impacto:** Magic links funcionan correctamente

### 📁 Estructura de API Actual

```
/api/
├── auth/
│   └── login/route.ts          # Magic link sender
├── coffees/
│   ├── route.ts                # GET (list) + POST (create with image)
│   ├── [id]/route.ts           # GET, PUT, DELETE individual
│   ├── recent/route.ts         # GET recent coffees with ratings
│   └── [id]/preparations/      # Preparations CRUD
├── storage/
│   └── upload/route.ts         # Image upload (for editing)
└── dictionary/
    └── [type]/route.ts         # Dictionary values
```

### 🎨 Patrones de UI Establecidos

#### 1. Formularios con Imágenes

- **Patrón:** Preview de imagen + input oculto + FormData submission
- **Implementación:** `CoffeeForm.tsx` como referencia
- **Validación:** Imagen requerida para creación, opcional para edición

#### 2. Manejo de Estados de Loading

- **Patrón:** Estados separados para upload vs creación
- **UI:** Botones con estados "Subiendo imagen..." vs "Guardando café..."
- **UX:** Feedback claro del progreso de operaciones

### 🔄 Flujos de Datos Optimizados

#### 1. Creación de Café

```
Usuario selecciona imagen → Preview local → Submit FormData →
Upload a Supabase → Obtener publicUrl → Crear registro → Redirect
```

#### 2. Edición de Café

```
Cargar datos existentes → Mostrar imagen actual →
Si nueva imagen: Upload separado → Update con nueva URL →
Si no: Update solo datos → Redirect
```

### 🧪 Testing y Calidad

#### 1. Linting Configurado

- **Reglas:** No `any` types, no unused variables
- **Implementación:** ESLint con reglas estrictas de TypeScript
- **Estado:** Todos los warnings resueltos

#### 2. Type Safety

- **Patrón:** Interfaces específicas para cada response
- **Implementación:** `UploadImageResponse`, `CreateCoffeeRequest`, etc.
- **Beneficio:** Detección temprana de errores de tipos

#### 4. Sistema de Preparaciones con Historial

- **Implementación:** CRUD completo de preparaciones con historial por café
- **Flujo:** Crear preparación → Ver en historial → Eliminar con confirmación
- **Archivos clave:**
  - `/api/coffees/[id]/preparations/[prepId]/route.ts` - DELETE endpoint
  - `PreparationHistoryCard.tsx` - Card con iconos de acción
  - `useDeleteCoffeePreparation` - Hook para eliminación
- **UX:** Iconos de calendario (info), editar (placeholder), eliminar (funcional)

#### 5. Sistema de Eliminación de Cafés

- **Implementación:** Eliminación completa con cascada y optimistic updates
- **Flujo:** Confirmar → Animar → Eliminar (preparaciones → imagen → café) → Redirect
- **Hooks utilizados:**
  - `useDeletePreparationsByCoffeeId` - Elimina preparaciones del café
  - `useDeleteImage` - Elimina imagen del storage
  - `useDeleteCoffee` - Elimina café con optimistic update
- **Animaciones:** Framer Motion con efecto de destrucción (300ms)
- **UX:** Navegación inmediata al home, eliminación en background

#### 6. Sistema de Animaciones Profesionales

- **Librería:** Framer Motion integrada en toda la aplicación
- **Páginas animadas:**
  - **Login:** Fade in + slide up, logo con scale, mensajes animados
  - **Home:** Stagger animation para cards con delays progresivos
  - **New/Edit Coffee:** Slide in desde derecha con secuencia
  - **New Process:** Slide in + transiciones entre tabs
- **Componentes reutilizables:**
  - `DeleteConfirmDialog` - Diálogo de confirmación unificado
  - Animaciones de eliminación con `AnimatePresence`
- **UX mejorada:** Transiciones fluidas, feedback visual, sensación moderna

### 🎯 Funcionalidad Recién Implementada

#### Botones de Acción en Historial de Preparaciones

- **Fecha:** 09/01/2025
- **Implementación:** Tres iconos en esquina superior derecha de cada card
- **Funcionalidades:**
  - 📅 **Calendario:** Tooltip con fecha completa
  - ✏️ **Editar:** Placeholder deshabilitado para futuro desarrollo
  - 🗑️ **Eliminar:** Funcional con diálogo de confirmación
- **Componentes:**
  - `AlertDialog` de Shadcn para confirmación
  - `Tooltip` para información contextual
  - **Framer Motion** para animaciones profesionales
- **Animaciones:**
  - **Optimistic Update:** Eliminación inmediata de UI
  - **Exit Animation:** Fade out + scale down + slide up (300ms)
  - **Physics:** Easing natural con `easeInOut`
  - **Layout:** Transiciones automáticas entre elementos
- **UX:** Distribución que no interfiere con información principal

### 🚨 REGLAS CRÍTICAS DEL PROYECTO

#### HOOKS PATTERN - VIOLACIÓN = REFACTOR

```typescript
// ❌ PROHIBIDO - Import directo en endpoint
import { CoffeeService } from '@/services/coffee-service';

// ❌ PROHIBIDO - Import dinámico
const { CoffeeService } = await import('@/services/coffee-service');

// ✅ CORRECTO - Hook en frontend
const deleteCoffee = useDeleteCoffee();
const deletePreparations = useDeletePreparationsByCoffeeId();
```

#### ARQUITECTURA OBLIGATORIA

- **Frontend:** Hooks + React Query
- **API Endpoints:** Solo orquestación simple
- **Servicios:** Solo operaciones de datos
- **Lógica de negocio:** En hooks del frontend

### 📋 Próximas Tareas Identificadas

1. **Funcionalidad de Edición**

   - Implementar edición de preparaciones existentes
   - Formulario modal o página dedicada

2. **Mejoras de Animaciones**

   - Page transitions entre rutas
   - Loading skeletons animados
   - Micro-interacciones en botones

3. **Optimización de Imágenes**

   - Implementar compresión antes del upload
   - Múltiples tamaños (thumbnails)

3. **Mejoras de UX**

   - Loading states más granulares
   - Error handling más específico

4. **Performance**
   - Lazy loading de imágenes
   - Caching de dictionary values

### 🔍 Puntos de Atención

1. **Supabase Storage:** URLs públicas requieren configuración correcta de bucket policies
2. **FormData:** Siempre verificar que el archivo existe antes de append
3. **Auth Tokens:** Verificar expiración y renovación automática
4. **Type Safety:** Mantener interfaces actualizadas con cambios de API

---

**Última revisión:** Sistema funcionando completamente - creación de cafés con imágenes operativa
