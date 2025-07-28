# System Patterns - Cafolio

## Arquitectura
- **Frontend**: Component-based con React + TanStack Start
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Patrón**: Feature-based folder structure

## Convenciones de Código
- TypeScript estricto en todo el proyecto
- Componentes funcionales con hooks
- Atomic design para componentes UI
- Custom hooks para lógica de negocio

## Estructura de Carpetas
```
/features/
  /auth/
  /coffees/
  /preparations/
/components/ui/
/hooks/
/services/
/types/
```

## Patrones de Estado
- Jotai para estado global
- React Query para server state
- Local state con useState/useReducer

## Validación
- Zod para schemas
- React Hook Form para formularios

## Testing
- **Unitarias**: Jest con mocks de Supabase
- **Integración**: Jest con base de datos real + cleanup automático
- **Cobertura**: Configurada para ambos tipos de pruebas
- **Patrón de cleanup**: Cada test maneja sus propios datos
- **Datos de prueba**: Prefijo `test_` en user_id para identificación