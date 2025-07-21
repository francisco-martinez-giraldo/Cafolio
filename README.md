# Cafolio - Aplicación de Registro de Café

## Resumen del Proyecto

Cafolio es una aplicación para entusiastas del café que permite registrar, evaluar y hacer seguimiento de diferentes marcas de café, sus preparaciones y catas. La aplicación está diseñada para proporcionar una experiencia de usuario fluida y organizada para los amantes del café.

## Estructura del Proyecto

El proyecto está organizado en dos componentes principales:

### Frontend (cafolio-app)

- **Framework:** TanStack Start con React
- **Componentes UI:** Shadcn UI con Tailwind CSS
- **Gestión de Estado:** Jotai
- **Fetching de Datos:** React Query con Axios

### Backend (cafolio-api)

- **Lenguaje:** TypeScript
- **Plataforma:** Supabase (PostgreSQL)
- **Testing:** Jest
- **Documentación API:** Swagger (OpenAPI)

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

## Próximos Pasos

- Implementación completa de todas las historias de usuario
- Pruebas de integración
- Optimización de rendimiento
- Preparación para despliegue