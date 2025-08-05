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

#### 1. Manejo de Errores Mejorado

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

### 📋 Próximas Tareas Identificadas

1. **Optimización de Imágenes**

   - Implementar compresión antes del upload
   - Múltiples tamaños (thumbnails)

2. **Mejoras de UX**

   - Loading states más granulares
   - Error handling más específico

3. **Performance**
   - Lazy loading de imágenes
   - Caching de dictionary values

### 🔍 Puntos de Atención

1. **Supabase Storage:** URLs públicas requieren configuración correcta de bucket policies
2. **FormData:** Siempre verificar que el archivo existe antes de append
3. **Auth Tokens:** Verificar expiración y renovación automática
4. **Type Safety:** Mantener interfaces actualizadas con cambios de API

---

**Última revisión:** Sistema funcionando completamente - creación de cafés con imágenes operativa
