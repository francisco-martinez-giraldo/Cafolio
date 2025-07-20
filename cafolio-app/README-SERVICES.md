# Servicios API - Cafolio App

## Estructura Implementada

```
src/
├── lib/
│   ├── api.ts              # Cliente Axios configurado
│   └── query-client.ts     # Configuración React Query
├── types/
│   └── api.ts              # Interfaces TypeScript
├── services/
│   ├── dictionary.service.ts
│   ├── coffees.service.ts
│   └── index.ts
├── hooks/
│   ├── useDictionary.ts
│   ├── useCoffees.ts
│   └── index.ts
└── components/
    ├── providers/
    │   └── query-provider.tsx
    └── examples/
        ├── CoffeeExample.tsx
        └── DictionaryExample.tsx
```

## Uso de los Servicios

### Importar hooks:
```typescript
import { useRecentCoffees, useCreateCoffee } from '@/hooks';
```

### Ejemplo de uso:
```typescript
const { data: coffees, isLoading, error } = useRecentCoffees();
const createCoffee = useCreateCoffee();

// Crear café
createCoffee.mutate({
  user_id: 'user-123',
  brand_dictionary_id: 'brand-1',
  // ... otros campos
});
```

## Servicios Disponibles

### Dictionary Service
- `getByType(type)` - Obtener items por tipo
- `getAllTypes()` - Obtener todos los tipos
- `create(item)` - Crear item
- `update(id, item)` - Actualizar item
- `delete(id)` - Eliminar item

### Coffees Service
- `getRecent()` - Obtener cafés recientes
- `getById(id)` - Obtener café por ID
- `getByUserId(userId)` - Obtener cafés por usuario
- `create(coffee)` - Crear café
- `update(id, coffee)` - Actualizar café
- `delete(id)` - Eliminar café

## Configuración

Agregar variable de entorno:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```