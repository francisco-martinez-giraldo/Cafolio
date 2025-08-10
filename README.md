# Cafolio - Aplicación de Registro de Café

## Resumen del Proyecto

Cafolio es una aplicación para entusiastas del café que permite registrar, evaluar y hacer seguimiento de diferentes marcas de café, sus preparaciones y catas.

## Estado Actual

✅ **Completamente Implementado:**
- Estructura base del proyecto
- Autenticación con Supabase Magic Links
- CRUD completo de marcas de café con imágenes
- Sistema de preparaciones completo
- Historial de preparaciones por café
- Campo de molienda (grind) en preparaciones
- UI components con Shadcn
- Storage unificado con Supabase (URLs públicas)
- Upload de imágenes en un solo llamado API
- Sistema de autenticación con tokens y middleware
- Manejo de errores sin tipos 'any'
- Type safety completo en TypeScript

## Stack Tecnológico

### Frontend (cafolio-app)
- **Framework:** Next.js 15 con App Router
- **UI:** Shadcn UI + Tailwind CSS
- **Estado:** Jotai + React Query
- **HTTP:** Axios
- **Forms:** React Hook Form + Zod

### Backend (cafolio-api)
- **Runtime:** Node.js con TypeScript
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage + Multer
- **Testing:** Jest (unitarias + integración)
- **Docs:** Swagger/OpenAPI

## Historias de Usuario

1. **Login de Usuario (US-01)**
   - Autenticación segura mediante email y contraseña
   - Validación de formato de email
   - Manejo de errores de autenticación

2. **Pantalla de Inicio (US-02/US-03)**
   - Muestra las 3 marcas de café más recientemente utilizadas
   - Opción para añadir una nueva marca
   - Navegación a detalles de marca

3. **Añadir Nueva Marca de Café (US-04/US-05)**
   - Formulario con campos requeridos y opcionales
   - Validación de datos (nombre único, mínimo 3 caracteres)
   - Carga de imagen para la marca

4. **Pantalla de Detalle de Marca (US-06)**
   - Muestra información completa de la marca
   - Lista de preparaciones asociadas
   - Opción para añadir nueva preparación

5. **Añadir Nueva Preparación/Cata (US-07)**
   - Registro de método, temperatura, ratio, molienda
   - Sistema de calificación (0-5 en incrementos de 0.5)
   - Notas opcionales

6. **Almacenamiento Local de Fotos (US-08)**
   - Almacenamiento de imágenes en el dispositivo
   - Una imagen por marca

7. **Valores Fijos para Campos Configurables (US-09)**
   - Listas predefinidas para parámetros de preparación
   - No editables por el usuario en MVP

8. **Navegación y Validación (US-10)**
   - Flujo lineal de navegación
   - Validación robusta en cada paso

## Estructura de Archivos

```
Cafolio/
├── cafolio-api/         # Backend API
│   ├── src/
│   │   ├── config/      # Configuración de Supabase y Swagger
│   │   ├── features/    # Módulos de funcionalidad
│   │   │   ├── auth/    # Autenticación
│   │   │   ├── coffees/ # Gestión de cafés
│   │   │   └── dictionary/ # Valores predefinidos
│   │   └── types/       # Definiciones de tipos
│   └── tests/           # Pruebas unitarias
│
├── cafolio-app/         # Frontend
│   ├── public/          # Archivos estáticos
│   └── src/
│       ├── app/         # Rutas de la aplicación
│       │   ├── (authenticated)/ # Rutas protegidas
│       │   └── login/   # Página de login
│       ├── components/  # Componentes reutilizables
│       │   └── ui/      # Componentes de UI
│       ├── contexts/    # Contextos de React
│       ├── hooks/       # Hooks personalizados
│       ├── lib/         # Utilidades y configuración
│       ├── services/    # Servicios de API
│       └── types/       # Definiciones de tipos
│
└── Mockups/             # Diseños de interfaz
```

## Flujo de Navegación

1. Login → 
2. Home (últimas 3 marcas) → 
3. Detalle de Marca o Añadir Nueva Marca → 
4. Añadir Preparación

## Instalación y Desarrollo

### Backend
```bash
cd cafolio-api
npm install
npm run dev
```

### Frontend
```bash
cd cafolio-app
npm install
npm run dev
```

### Testing
```bash
# Pruebas unitarias
npm test

# Pruebas de integración
npm run test:integration

# Cobertura
npm run test:coverage
```

## Funcionalidades Completadas

### ✅ Sistema de Eliminación Completo
- **Preparaciones:** Eliminación individual con optimistic updates
- **Cafés:** Eliminación en cascada (preparaciones → imagen → café)
- **Componente reutilizable:** `DeleteConfirmDialog` para confirmaciones
- **Animaciones:** Efectos de destrucción profesionales
- **UX optimizada:** Navegación inmediata con eliminación en background

### ✅ Sistema de Animaciones Profesionales
- **Framer Motion:** Integrado en toda la aplicación
- **Login:** Fade in + slide up con logo animado
- **Home:** Stagger animation para cards con delays progresivos
- **Formularios:** Slide in desde derecha con secuencias
- **Eliminaciones:** Exit animations con física natural
- **UX moderna:** Transiciones fluidas y feedback visual

### ✅ Sistema de Historial
- Navegación desde home a historial específico por café
- Visualización de preparaciones ordenadas por fecha
- UI optimizada con distribución justificada
- Badges individuales para notas de cata
- Iconos de acción (calendario, editar, eliminar)

### ✅ Sistema de Autenticación Completo
- Magic Links con Supabase Auth
- Callback automático y redirección
- Middleware de protección de rutas
- AuthGuard para componentes
- Dual storage (cookies + localStorage)

### ✅ Upload de Imágenes Optimizado
- Endpoint unificado para imagen + datos
- Supabase Storage con URLs públicas
- FormData para creación, JSON para edición
- Preview de imágenes en tiempo real
- Validación de archivos requeridos

### ✅ Arquitectura y Patrones
- **Hooks pattern:** Obligatorio para todas las operaciones
- **Optimistic updates:** React Query con reversión automática
- **Separación de responsabilidades:** Frontend (hooks) → API (endpoints) → Servicios
- **Type safety:** 100% TypeScript sin tipos 'any'
- **Componentes reutilizables:** UI consistente y mantenible

## Funcionalidades Core Completadas ✅

Todas las historias de usuario principales están implementadas y funcionando:

1. ✅ **Autenticación completa** - Magic links operativos
2. ✅ **CRUD de cafés** - Creación, lectura, actualización, eliminación
3. ✅ **Upload de imágenes** - Integrado en un solo flujo
4. ✅ **Sistema de preparaciones** - Completo con historial
5. ✅ **UI/UX optimizada** - Responsive y accesible

## Próximos Pasos (Mejoras)

- **Edición de preparaciones:** Formulario modal o página dedicada
- **Page transitions:** Animaciones entre rutas
- **Loading skeletons:** Estados de carga animados
- **Filtros en historial:** Por método, calificación, fecha
- **Estadísticas:** Métricas y gráficos de preparaciones
- **Optimización de imágenes:** Compresión y thumbnails
- **Deploy en producción:** CI/CD y monitoring