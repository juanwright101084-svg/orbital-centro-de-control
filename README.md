Orbital: autenticación segura con cookies httpOnly

Aplicación web con un sistema de autenticación construido con Next.js (App Router) y Supabase. La sesión vive en cookies httpOnly, toda la autenticación pasa por Server Actions, y las rutas privadas están protegidas por el proxy de Next.js. La interfaz tiene el aspecto de un centro de control espacial.

Repositorio: https://github.com/TU_USUARIO/TU_REPOSITORIO
Aplicación en producción: https://TU-APP.vercel.app
Capturas
Login	Dashboard	Cookies httpOnly
Mostrar imagen	Mostrar imagen	Mostrar imagen
Stack
Next.js 16 (App Router) y React 19
TypeScript
Supabase (Auth + Database) con @supabase/ssr
Zod para validación
Tailwind CSS
Funcionalidades
Registro con validación en cliente y servidor
Verificación de correo electrónico
Inicio y cierre de sesión
Recuperación y cambio de contraseña
Dashboard privado con los datos del usuario autenticado
Navegación condicional según el estado de la sesión
Redirecciones automáticas: usuarios sin sesión van a /login, y usuarios con sesión que visitan /login o /register van a /dashboard
Refresco automático de la sesión en cada petición
Estructura
src/
├── proxy.ts                       # Entrada del proxy (antes "middleware")
├── app/
│   ├── page.tsx                   # Portada
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── auth/
│   │   ├── callback/route.ts      # Confirmación de correo y recuperación
│   │   └── reset-password/page.tsx
│   └── dashboard/page.tsx         # Ruta privada
├── components/                    # Navbar, formularios, cuenta regresiva
└── lib/
    ├── supabase/
    │   ├── server.ts              # Cliente para Server Components, Actions y Route Handlers
    │   ├── client.ts              # Cliente para Client Components (datos no sensibles)
    │   └── proxy.ts               # Cliente y lógica de sesión del proxy
    ├── actions/auth.ts            # Server Actions: registro, login, logout, recuperación
    └── validations/auth.ts        # Esquemas de Zod compartidos
Instalación

Requisitos: Node.js 20.9 o superior y una cuenta en Supabase.

bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO
npm install
cp .env.example .env.local   # en Windows PowerShell: Copy-Item .env.example .env.local
Variables de entorno

Completa .env.local con los datos de tu proyecto (Supabase → Project Settings → API Keys):

env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica
NEXT_PUBLIC_SITE_URL=http://localhost:3000

Usa solo la clave pública (publishable o anon). Nunca pongas la service_role ni la secret key en estas variables.

Configuración de Supabase

En Authentication → URL Configuration:

Site URL: http://localhost:3000
Redirect URLs: http://localhost:3000/auth/callback y http://localhost:3000/**

En Authentication → Sign In / Providers, deja habilitado Email con Confirm email activado.

Ejecución
bash
npm run dev

Abre http://localhost:3000.

Cómo probarlo
Entra a /dashboard sin sesión: te redirige a /login.
Regístrate en /register y confirma el enlace que llega al correo.
Inicia sesión: llegas al dashboard.
Visita /login con la sesión abierta: te redirige al dashboard.
Cierra sesión desde la barra superior.
Prueba "Recuperar contraseña" desde /login.
Seguridad

Cookies. Las cookies de sesión se escriben con httpOnly: true, secure (en producción), sameSite: "lax" y path: "/". Se fuerzan tanto en lib/supabase/server.ts como en lib/supabase/proxy.ts.

Por qué toda la autenticación va por el servidor. Por defecto, las cookies de @supabase/ssr no son httpOnly, porque el cliente de navegador necesita leerlas. Aquí se fuerza httpOnly y el login, el registro y el logout se hacen únicamente con Server Actions. Por eso el cliente de navegador (client.ts) no ve la sesión: es intencional, y se reserva para datos no sensibles.

XSS. El token de sesión no es accesible desde JavaScript, así que un script inyectado no puede robarlo. React escapa el contenido por defecto y no se usa dangerouslySetInnerHTML. Se añaden cabeceras de seguridad en next.config.ts.

CSRF. Las Server Actions de Next.js solo aceptan peticiones POST y comparan las cabeceras Origin y Host. Además, las cookies usan sameSite: "lax".

Sin almacenamiento en el navegador. Ningún token se guarda en localStorage ni sessionStorage.

Validación. Los datos se validan con Zod en el servidor (la validación que realmente cuenta) y con atributos HTML en el cliente.

Verificación de sesión. El proxy y las páginas usan supabase.auth.getUser(), que valida el token contra Supabase, en lugar de getSession(), que solo lee la cookie.

Mensajes de error. Son informativos pero genéricos ("Correo o contraseña incorrectos"), y la recuperación de contraseña responde igual exista o no el correo, para evitar la enumeración de usuarios.

Redirecciones. El parámetro next del callback solo acepta rutas internas, para evitar redirecciones abiertas.

Variables de entorno. Los secretos no se suben al repositorio (.env.local está en .gitignore); .env.example documenta las variables necesarias.

Nota sobre el proxy

Next.js 16 renombró middleware.ts a proxy.ts. Este proyecto usa src/proxy.ts, que cumple la misma función.

Despliegue en Vercel
Sube el repositorio a GitHub e impórtalo en Vercel.
En Settings → Environment Variables, agrega las tres variables. En producción, NEXT_PUBLIC_SITE_URL debe ser la URL de la app, por ejemplo https://tu-app.vercel.app.
En Supabase (Authentication → URL Configuration), agrega la URL de producción:
Redirect URLs: https://tu-app.vercel.app/auth/callback y https://tu-app.vercel.app/**
Si quieres, cambia la Site URL a la de producción.
Vuelve a desplegar y prueba el flujo completo.
Limitaciones conocidas
El proyecto usa el servicio de correo integrado de Supabase, que solo envía a miembros de la organización y tiene un límite bajo de envíos por hora. Para enviar a cualquier usuario hay que configurar un SMTP propio (por ejemplo, Resend o Brevo).
Las misiones y la telemetría del dashboard son datos de demostración.
Scripts
Comando	Descripción
npm run dev	Servidor de desarrollo
npm run build	Compilación de producción
npm run start	Servidor de producción
npm run lint	Revisión con ESLint