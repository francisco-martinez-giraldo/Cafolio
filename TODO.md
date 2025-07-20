# Cafolio - Pendientes

## cafolio-app (Frontend)

1. **Autenticación**
   - Implementar login con Supabase a través de la API
   - Mantener sesión del usuario (persistencia)
   - Ajustar llamadas a la API para usar el email de la sesión actual

2. **Funcionalidades**
   - Implementar página de "Nuevo Café"
   - Implementar página de "Nueva Preparación"
   - Agregar filtros funcionales en la página Home

3. **UI/UX**
   - Mejorar feedback visual durante carga
   - Implementar modo oscuro
   - Optimizar para dispositivos móviles

## cafolio-api (Backend)

1. **Autenticación**
   - Implementar endpoints de autenticación con Supabase
   - Validación de tokens JWT
   - Middleware de protección de rutas

2. **Endpoints**
   - Crear CRUD completo para cafés
   - Crear CRUD completo para preparaciones
   - Implementar filtros y búsqueda

3. **Optimización**
   - Implementar caché para consultas frecuentes
   - Optimizar consultas a la base de datos
   - Agregar validación de datos con Zod