# Cafolio - App de Café

## 📱 Descripción
Cafolio es una aplicación para amantes del café que permite registrar, calificar y descubrir diferentes variedades de café.

## 🛠️ Tecnologías
- **Frontend**: Next.js 15, React, TypeScript
- **UI**: Tailwind CSS, Shadcn UI
- **Estado**: Jotai
- **API**: React Query, Axios
- **Backend**: Supabase

## 🚀 Características
- Autenticación de usuarios
- Catálogo de cafés con calificaciones
- Sistema de filtrado
- Agregar nuevos cafés
- Calificar preparación y aroma

## 🏗️ Estructura del Proyecto
```
src/
├── app/                # Rutas de la aplicación
│   ├── home/           # Página principal
│   └── login/          # Página de login
├── components/         # Componentes reutilizables
│   ├── ui/             # Componentes UI básicos (shadcn)
│   ├── CoffeeCard.tsx  # Tarjeta de café
│   └── CoffeeCardNew.tsx # Tarjeta para agregar café
└── lib/               # Utilidades y configuraciones
```

## 🎨 Tema y Diseño
- Colores primarios: Verde café (`#416826`)
- Colores secundarios: Marrón café (`#815530`)
- Diseño responsive y mobile-first
- Componentes accesibles

## 📋 Roadmap
- **Fase I**: Login, Home, Nuevo Café, Nueva Preparación
- **Fase II**: Café Favorito, Mejoras UX
- **Fase III**: Configuración, Reportes, Imágenes

## 🚀 Instalación y Uso
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 👥 Contribución
Proyecto desarrollado por el equipo Cafolio.