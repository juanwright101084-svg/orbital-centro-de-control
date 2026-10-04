markdown
# 🚀 Orbital - Centro de Control

Sistema de autenticación seguro con **cookies httpOnly**, **Supabase** y **Next.js 16**, aplicando las mejores prácticas de seguridad web: protección contra XSS y CSRF, Server Actions, middleware de protección de rutas y gestión segura de sesiones.

## 🌐 Demo en Producción

👉 **[Ver aplicación en vivo](https://TU-LINK-DE-VERCEL.vercel.app)** _(actualizar después del deploy)_

## 🛠️ Stack Tecnológico

- **Next.js 16+** (App Router)
- **TypeScript** (tipado completo)
- **Supabase** (Authentication + Database)
- **@supabase/ssr** (Gestión de cookies httpOnly)
- **Tailwind CSS** (Estilos)
- **Vercel** (Deploy en producción)

## 🔐 Características de Seguridad Implementadas

| Medida | Descripción |
|---|---|
| **Cookies httpOnly** | Los tokens JWT nunca son accesibles por JavaScript del cliente |
| **Flag `secure`** | Activado automáticamente en producción (HTTPS) |
| **Flag `sameSite: lax`** | Protección contra ataques CSRF |
| **Sin localStorage** | Ningún token se guarda en almacenamiento accesible |
| **Server Actions** | Toda la lógica de auth corre en el servidor |
| **Middleware** | Protección y refresco automático de sesiones |
| **Validación doble** | Cliente (HTML5) + Servidor (Zod) |
| **Variables de entorno** | Secretos separados en `.env.local` (nunca en Git) |

## ✨ Funcionalidades

- ✅ Registro con validación de email y confirmación de contraseña
- ✅ Inicio de sesión con Server Actions
- ✅ Cierre de sesión seguro
- ✅ Recuperación de contraseña por email
- ✅ Verificación de email (callback)
- ✅ Reset de contraseña con token
- ✅ Dashboard privado con información del usuario
- ✅ Middleware protegiendo rutas y redirigiendo según estado de auth

## 🎨 Diseño UX/UI

- 🎬 Pantalla de bienvenida tipo "Centro de Control Espacial"
- 🎥 Videos de fondo con sonido activado por interacción del usuario (SpaceX-style)
- 🌌 Efectos de vidrio esmerilado (backdrop-blur)
- ✨ Animaciones suaves (fadeInUp)

## 📦 Instalación Local

### Prerrequisitos
- Node.js 18+ 
- Cuenta en [Supabase](https://supabase.com)

### Pasos

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/juanwright101084-svg/orbital-centro-de-control.git
   cd orbital-centro-de-control
Instala dependencias:

bash
npm install
Configura las variables de entorno:

Crea un archivo .env.local en la raíz con:

env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
(Puedes guiarte por .env.example)

Corre el servidor de desarrollo:

bash
npm run dev
Abre en el navegador:

text
http://localhost:3000
📁 Estructura del Proyecto
text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx              # Iniciar sesión
│   │   ├── register/page.tsx           # Crear cuenta
│   │   └── forgot-password/page.tsx    # Recuperar contraseña
│   ├── auth/
│   │   ├── callback/route.ts           # Callback de Supabase
│   │   └── reset-password/page.tsx     # Reset con token
│   ├── dashboard/page.tsx              # Ruta protegida
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── SubmitButton.tsx
│   ├── Navbar.tsx
│   └── ...
├── lib/
│   ├── actions/auth.ts                 # Server Actions
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── proxy.ts
│   └── validations/auth.ts             # Schemas Zod
├── proxy.ts
└── middleware.ts                       # Protección de rutas
🔑 Variables de Entorno Requeridas
Variable	Descripción	Dónde obtenerla
NEXT_PUBLIC_SUPABASE_URL	URL del proyecto Supabase	Supabase → Settings → API
NEXT_PUBLIC_SUPABASE_ANON_KEY	Clave pública (anon)	Supabase → Settings → API
⚠️ NUNCA subas tu .env.local a Git. El archivo .gitignore ya lo excluye.