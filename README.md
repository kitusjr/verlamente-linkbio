# Creator Lab - Clean Version

Una versión limpia del proyecto Creator Lab construida con Next.js 15, TypeScript y Tailwind CSS.

## 🚀 Características

- **Next.js 15.5.2** con App Router
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **Responsive Design** para móvil y desktop
- **Scroll normal** sin bloqueos
- **Componentes reutilizables**
- **Animaciones suaves**
- **Cursor personalizado**

## 📁 Estructura del Proyecto

```
creator-lab-clean/
├── app/
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página home
│   └── creator-lab/
│       └── page.tsx         # Página del curso
├── components/
│   ├── CourseCard.tsx       # Componente de tarjeta de curso
│   └── BannerLaunch.tsx     # Banner promocional
├── public/
│   ├── favicon.png          # Favicon
│   └── assets/
│       └── logopng.png      # Logo del curso
└── vercel.json              # Configuración de Vercel
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 🌐 Despliegue

El proyecto está configurado para desplegarse en Vercel:

1. Conecta tu repositorio a Vercel
2. Selecciona la rama `clean-version`
3. Vercel detectará automáticamente la configuración de Next.js
4. El despliegue se realizará automáticamente

## 📱 Páginas

- **Home** (`/`): Página principal con hero section y enlaces rápidos
- **Creator Lab** (`/creator-lab`): Página detallada del curso

## ✨ Funcionalidades

### Página Home
- Hero section con animación de texto
- Enlaces rápidos con efectos hover
- Dropdown de recursos
- Curso destacado
- Enlaces sociales
- Cursor personalizado

### Página Creator Lab
- Información detallada del curso
- Video preview
- Lista de beneficios
- Grid de características
- CTA de compra
- Cursos relacionados

### Componentes
- **CourseCard**: Tarjeta reutilizable para mostrar cursos
- **BannerLaunch**: Banner flotante que no bloquea el scroll

## 🎨 Estilos

- **Tailwind CSS** para estilos utilitarios
- **Gradientes** y efectos de glassmorphism
- **Animaciones** suaves con CSS
- **Responsive** design para todos los dispositivos
- **Cursor personalizado** para desktop

## 🔧 Configuración

- **TypeScript** configurado con tipos estrictos
- **ESLint** para linting de código
- **PostCSS** para procesamiento de CSS
- **Turbopack** para builds rápidos

## 📦 Dependencias

- `next`: Framework de React
- `react`: Biblioteca de UI
- `typescript`: Tipado estático
- `tailwindcss`: Framework de CSS
- `lucide-react`: Iconos
- `@tailwindcss/postcss`: Plugin de PostCSS

## 🚀 Performance

- **Build optimizado**: 15.1 kB (home), 13.8 kB (creator-lab)
- **Páginas estáticas** pre-renderizadas
- **Lazy loading** de imágenes
- **Code splitting** automático

## 📄 Licencia

Este proyecto es privado y pertenece a Verlamente.

---

**Desarrollado con ❤️ por Verlamente**