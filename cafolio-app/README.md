# Cafolio Frontend

Aplicación frontend para gestionar granos de café y preparaciones, construida con TanStack Start y las mejores prácticas de desarrollo moderno.

## 🚀 Tech Stack

- **Framework:** TanStack Start
- **UI Components:** Shadcn UI
- **Styling:** Tailwind CSS v4
- **Data Fetching:** React Query
- **HTTP Client:** Axios
- **State Management:** Jotai

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes UI reutilizables
│   └── ui/             # Componentes de Shadcn UI
├── features/           # Módulos por características
│   ├── beans/          # Gestión de granos de café
│   └── brews/          # Gestión de preparaciones
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuraciones
├── services/           # Servicios API
└── store/              # Estado global con Jotai
```

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Tests
npm run test

# Preview
npm run serve
```

## 🔧 Configuración

1. Copia `.env.example` a `.env` y configura las variables:
   ```
   VITE_API_URL=http://localhost:3000/api
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 📦 Características Implementadas

- ✅ Configuración base de TanStack Start
- ✅ Integración con Tailwind CSS v4
- ✅ Configuración de Shadcn UI
- ✅ React Query para data fetching
- ✅ Axios configurado con interceptors
- ✅ Jotai para state management
- ✅ Estructura modular por features
- ✅ Configuración de desarrollo

## 🎯 Próximos Pasos

- Implementar componentes específicos para beans y brews
- Conectar con la API de Supabase
- Agregar formularios y validaciones
- Implementar autenticación
- Agregar tests unitarios