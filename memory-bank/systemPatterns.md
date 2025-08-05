# Patrones del Sistema - Cafolio

## 🏗️ Arquitectura General

### Frontend (Next.js 15)
- **Patrón:** App Router con Server Components
- **Estructura:** Feature-based organization
- **Estado:** Jotai (local) + React Query (server state)

### Backend (Supabase + API Routes)
- **Patrón:** API Routes como BFF (Backend for Frontend)
- **Base de datos:** Supabase PostgreSQL
- **Storage:** Supabase Storage con URLs públicas

## 📁 Organización de Archivos

### Frontend Structure
```
src/
├── app/                    # App Router pages
│   ├── (authenticated)/   # Protected routes group
│   ├── api/               # API routes (BFF layer)
│   └── auth/              # Auth-related pages
├── components/            # Reusable components
│   └── ui/               # Shadcn UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── services/             # API client services
└── types/                # TypeScript definitions
```

### API Routes Pattern
```
/api/
├── auth/                 # Authentication endpoints
├── coffees/              # Coffee CRUD + nested resources
├── storage/              # File upload endpoints
└── dictionary/           # Static data endpoints
```

## 🔐 Autenticación y Autorización

### Patrón de Autenticación
- **Método:** Supabase Auth con Magic Links (OTP)
- **Flow:** Email → Magic Link → Callback → Token Storage
- **Storage:** Cookie + localStorage (dual storage)

### Middleware Pattern
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const publicPaths = ['/login', '/auth/callback'];
  const authToken = request.cookies.get('auth_token');
  
  if (!authToken?.value && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### AuthGuard Pattern
```typescript
// AuthGuard component
const publicPaths = ['/login', '/', '/auth/callback'];
const isPublicPath = publicPaths.includes(pathname);

if (!user && !isPublicPath) {
  return null; // Will redirect via useEffect
}
```

## 📡 Manejo de Datos

### 🔄 PATRÓN OBLIGATORIO: React Query + Hooks

**REGLA FUNDAMENTAL:** Toda operación async DEBE usar React Query hooks

#### ✅ Correcto:
```typescript
// Hook personalizado
export const useDeleteImage = () => {
  return useMutation({
    mutationFn: (photoPath: string) => storageService.deleteImage(photoPath),
  });
};

// Uso en componente
const deleteImage = useDeleteImage();
await deleteImage.mutateAsync(photoPath);
```

#### ❌ Incorrecto:
```typescript
// NO hacer llamados directos a servicios
const { storageService } = await import("@/services/storage.service");
await storageService.deleteImage(photoPath);
```

#### Beneficios del Patrón:
- **Estados automáticos:** `isPending`, `error`, `isSuccess`
- **Cache inteligente:** Evita requests duplicados
- **Retry logic:** Reintentos automáticos en fallos
- **Consistencia:** Mismo patrón en toda la app
- **UX mejorada:** Loading states granulares

### API Client Pattern
```typescript
// Axios interceptor for auth
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token') || getCookieToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Service Layer Pattern
```typescript
// services/coffees.service.ts
export const coffeesService = {
  create: async (coffee: CreateCoffeeRequest | FormData): Promise<Coffee> => {
    const config = coffee instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    
    const { data } = await apiClient.post("/api/coffees", coffee, config);
    return data;
  }
};
```

### React Query Integration
```typescript
// hooks/useCoffees.ts
export const useCreateCoffee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: coffeesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffees"] });
    },
  });
};
```

## 🖼️ Manejo de Archivos

### Upload Pattern (Unified)
```typescript
// Para creación: Un solo endpoint maneja imagen + datos
POST /api/coffees
Content-Type: multipart/form-data

FormData:
- file: File
- brand_dictionary_id: string
- variety_dictionary_id: string
- ...otros campos
```

### Storage Service Pattern
```typescript
async uploadImage(file: Buffer, fileName: string, contentType: string, folder?: string) {
  const path = folder ? `${folder}/${fileName}` : `storage/${fileName}`;
  
  const { data, error } = await supabase.storage
    .from(this.bucketName)
    .upload(path, file, { contentType, upsert: true });

  if (error) throw error;
  
  // Obtener URL pública
  const { data: publicUrlData } = supabase.storage
    .from(this.bucketName)
    .getPublicUrl(path);
  
  return {
    ...data,
    publicUrl: publicUrlData.publicUrl
  };
}
```

## 🎨 Patrones de UI

### Form Pattern con Imagen
```typescript
// CoffeeForm.tsx pattern
const [imagePreview, setImagePreview] = useState<string | null>(null);
const [selectedFile, setSelectedFile] = useState<File | null>(null);

// Para creación: FormData
if (!isEditing) {
  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('brand_dictionary_id', data.brand);
  // ...otros campos
  
  await createCoffee.mutateAsync(formData);
}

// Para edición: Upload separado + JSON update
if (isEditing && selectedFile) {
  const uploadResult = await uploadImage.mutateAsync({
    file: selectedFile,
    folder: "coffees",
  });
  photoPath = uploadResult.path;
}
```

### Loading States Pattern
```typescript
<Button
  disabled={uploadImage.isPending || createCoffee.isPending}
>
  {uploadImage.isPending
    ? "Subiendo imagen..."
    : createCoffee.isPending
    ? "Guardando café..."
    : "Guardar Café"}
</Button>
```

## 🛡️ Manejo de Errores

### API Error Pattern
```typescript
// Catch blocks sin 'any'
} catch (error) {
  return NextResponse.json({ 
    error: error instanceof Error ? error.message : 'Error desconocido' 
  }, { status: 400 });
}
```

### Frontend Error Pattern
```typescript
// Service layer error handling
} catch (error: unknown) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  console.error('Coffee creation error:', errorMessage);
  throw error;
}
```

## 🗃️ Base de Datos

### Supabase Patterns
```sql
-- Tabla coffees con constraints
CREATE TABLE coffees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  brand_dictionary_id UUID REFERENCES dictionary(id),
  variety_dictionary_id UUID REFERENCES dictionary(id),
  process_dictionary_id UUID REFERENCES dictionary(id),
  photo_path TEXT NOT NULL, -- Required field
  price DECIMAL(10,2),
  region TEXT,
  farm TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Query Patterns
```typescript
// Service layer con joins
const { data, error } = await supabase
  .from("coffees")
  .select(`
    *,
    brand:dictionary!brand_dictionary_id(*),
    variety:dictionary!variety_dictionary_id(*),
    process:dictionary!process_dictionary_id(*)
  `)
  .eq("user_id", userId);
```

## 🔄 Estado y Sincronización

### React Query Cache Pattern
```typescript
// Invalidación granular
onSuccess: (data) => {
  queryClient.invalidateQueries({ queryKey: ["coffees", data.id] });
  queryClient.invalidateQueries({ queryKey: ["coffees", "recent"] });
}
```

### Optimistic Updates (Future)
```typescript
// Para implementar en futuras iteraciones
onMutate: async (newCoffee) => {
  await queryClient.cancelQueries({ queryKey: ['coffees'] });
  const previousCoffees = queryClient.getQueryData(['coffees']);
  
  queryClient.setQueryData(['coffees'], old => [...old, newCoffee]);
  
  return { previousCoffees };
}
```

## 📋 Validación

### Zod Schema Pattern
```typescript
const FormSchema = z.object({
  brand: z.string().min(1, "La marca es obligatoria"),
  variety: z.string().min(1, "La variedad es obligatoria"),
  process: z.string().min(1, "El proceso es obligatorio"),
  price: z.string().min(1, "El precio es obligatorio"),
  image: z.string().optional(),
  region: z.string().optional(),
  finca: z.string().optional(),
  notes: z.string().optional(),
});
```

### API Validation Pattern
```typescript
// Validación en endpoints
if (!file) {
  return NextResponse.json({ error: 'Imagen es requerida' }, { status: 400 });
}

if (!user.id) {
  return NextResponse.json({ error: 'User ID not found' }, { status: 401 });
}
```

## 🎯 Convenciones de Código

### Naming Conventions
- **Components:** PascalCase (`CoffeeForm`, `AuthGuard`)
- **Hooks:** camelCase con `use` prefix (`useCoffees`, `useAuth`)
- **Services:** camelCase con `Service` suffix (`coffeesService`, `storageService`)
- **Types:** PascalCase (`CreateCoffeeRequest`, `Coffee`)

### File Naming
- **Components:** PascalCase (`CoffeeForm.tsx`)
- **Hooks:** camelCase (`useCoffees.ts`)
- **Services:** kebab-case (`coffee-service.ts`)
- **API Routes:** kebab-case (`route.ts` in folders)

### Import Organization
```typescript
// 1. React/Next imports
import { useState } from "react";
import { useRouter } from "next/navigation";

// 2. Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 3. Internal components
import { Button } from "@/components/ui/button";

// 4. Internal hooks/services
import { useCreateCoffee } from "@/hooks/useCoffees";

// 5. Types
import { CreateCoffeeRequest } from "@/types/api";
```

---

**Última actualización:** 04 de Enero 2025 - Patrones consolidados después de implementación completa del sistema de upload