# 🚀 Orbital - Centro de Control

Sistema de autenticación seguro desarrollado con **Next.js 16**, **Supabase** y **cookies httpOnly**, aplicando buenas prácticas de seguridad web, protección contra XSS y CSRF, Server Actions, middleware/proxy para protección de rutas y gestión segura de sesiones.

## 🌐 Demo en Producción

👉 **[Ver aplicación en vivo](https://orbital-centro-de-control.vercel.app)**

## 🛠️ Stack Tecnológico

* **Next.js 16.3.8** (App Router)
* **TypeScript** (tipado completo)
* **React 19**
* **Supabase** (Authentication + Database)
* **@supabase/ssr** (gestión de sesiones mediante cookies)
* **Zod** (validación de datos)
* **Tailwind CSS 4** (estilos)
* **Vercel** (deploy en producción)

## 🔐 Características de Seguridad Implementadas

| Medida                           | Descripción                                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Cookies httpOnly**             | Los tokens de sesión no son accesibles directamente mediante JavaScript del navegador.                |
| **Flag `secure`**                | Las cookies se configuran para utilizar HTTPS en producción.                                          |
| **Flag `sameSite: lax`**         | Reduce el riesgo de solicitudes cross-site y ayuda a mitigar ataques CSRF.                            |
| **Sin localStorage para tokens** | Las credenciales de sesión no se almacenan en `localStorage`.                                         |
| **Server Actions**               | Las operaciones principales de autenticación se ejecutan en el servidor.                              |
| **Middleware/Proxy**             | Protección y actualización de la sesión para las rutas de la aplicación.                              |
| **Validación con Zod**           | Los datos recibidos por las acciones del servidor son validados antes de procesarse.                  |
| **Mensajes de error seguros**    | Se evita revelar información innecesaria sobre las cuentas de usuario.                                |
| **Protección contra XSS**        | Uso del renderizado seguro de React/Next.js, validación de entradas y cookies `httpOnly`.             |
| **Protección contra CSRF**       | Cookies `SameSite=Lax` y operaciones sensibles gestionadas mediante Server Actions.                   |
| **Variables de entorno**         | Las credenciales de configuración se mantienen fuera del código fuente mediante variables de entorno. |

## ✨ Funcionalidades

* ✅ Registro de usuarios
* ✅ Validación de email
* ✅ Confirmación de cuenta mediante correo electrónico
* ✅ Inicio de sesión mediante Server Actions
* ✅ Cierre de sesión seguro
* ✅ Recuperación de contraseña
* ✅ Restablecimiento de contraseña mediante token
* ✅ Callback de autenticación de Supabase
* ✅ Dashboard privado
* ✅ Información del usuario autenticado
* ✅ Protección de rutas privadas
* ✅ Redirección de usuarios no autenticados hacia `/login`
* ✅ Redirección de usuarios autenticados desde las rutas de autenticación hacia `/dashboard`
* ✅ Actualización/refresco de la sesión mediante Proxy

## 🎨 Diseño UX/UI

* 🎬 Pantalla de bienvenida con concepto de **Centro de Control Espacial**
* 🌌 Diseño visual inspirado en interfaces aeroespaciales
* 🎥 Video de fondo con interacción del usuario
* ✨ Efectos de vidrio esmerilado mediante `backdrop-blur`
* 🎞️ Animaciones suaves
* 📱 Diseño adaptable a diferentes tamaños de pantalla
* 🧭 Navegación condicional según el estado de autenticación

## 📦 Instalación Local

### Prerrequisitos

* Node.js 20.9+
* npm
* Cuenta de Supabase

### 1. Clonar el repositorio

```bash
git clone https://github.com/juanwright101084-svg/orbital-centro-de-control.git
cd orbital-centro-de-control
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_publishable_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Las variables deben corresponder al proyecto de Supabase utilizado por la aplicación.

> **Importante:** No subir `.env.local` al repositorio. El archivo debe permanecer excluido mediante `.gitignore`.

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### 5. Abrir la aplicación

Visitar:

```text
http://localhost:3000
```

## ☁️ Despliegue en Vercel

La aplicación se encuentra desplegada en producción mediante Vercel.

**Aplicación:**

https://orbital-centro-de-control.vercel.app

Para realizar un nuevo despliegue:

1. Importar el repositorio desde GitHub.
2. Seleccionar el framework **Next.js**.
3. Configurar las variables de entorno.
4. Realizar el deploy.

En producción, `NEXT_PUBLIC_SITE_URL` debe utilizar la URL de Vercel y no `localhost`.

## 🔑 Variables de Entorno Requeridas

| Variable                        | Descripción                         | Uso                                       |
| ------------------------------- | ----------------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL del proyecto Supabase           | Conexión con Supabase                     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable key pública de Supabase | Autenticación y acceso público controlado |
| `NEXT_PUBLIC_SITE_URL`          | URL base de la aplicación           | Callbacks de autenticación                |

### Entornos

**Desarrollo local:**

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Producción:**

```env
NEXT_PUBLIC_SITE_URL=https://orbital-centro-de-control.vercel.app
```

Las claves de Supabase deben corresponder al mismo proyecto de Supabase utilizado por la aplicación.

## 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── forgot-password/
│   │       └── page.tsx
│   │
│   ├── auth/
│   │   ├── callback/
│   │   │   └── route.ts
│   │   └── reset-password/
│   │       └── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── SubmitButton.tsx
│   ├── Navbar.tsx
│   ├── ChangePasswordForm.tsx
│   └── ...
│
├── lib/
│   ├── actions/
│   │   └── auth.ts
│   │
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── proxy.ts
│   │
│   └── validations/
│       └── auth.ts
│
└── proxy.ts
```

## 🔄 Flujo de Autenticación

```text
Usuario
   │
   ▼
Formulario de autenticación
   │
   ▼
Server Action
   │
   ▼
Validación Zod
   │
   ▼
Supabase Authentication
   │
   ▼
Cookie de sesión
   │
   ├── httpOnly
   ├── secure en producción
   └── sameSite=Lax
   │
   ▼
Proxy / protección de rutas
   │
   ▼
Dashboard privado
```

## 🛡️ Protección de Sesiones

La aplicación utiliza `@supabase/ssr` para gestionar las sesiones de Supabase mediante cookies.

Las cookies de autenticación se configuran con:

```text
httpOnly: true
secure: true en producción
sameSite: "lax"
path: "/"
```

Esto evita almacenar los tokens de sesión en mecanismos accesibles directamente por JavaScript, como `localStorage`.

## 🧪 Validación de Datos

La aplicación utiliza **Zod** para validar los datos recibidos por las Server Actions.

Las validaciones se realizan en el servidor antes de procesar las operaciones de autenticación.

Entre ellas se incluyen:

* Validación del formato del correo electrónico.
* Validación de contraseñas.
* Confirmación de contraseña.
* Validación de recuperación de contraseña.
* Validación del restablecimiento de contraseña.

## 🔒 Protección de Rutas

Las rutas privadas son protegidas mediante el Proxy de Next.js.

Cuando un usuario no autenticado intenta acceder al dashboard:

```text
/dashboard
     │
     ▼
¿Usuario autenticado?
     │
    NO
     │
     ▼
/login
```

Cuando un usuario autenticado intenta acceder a las rutas de autenticación:

```text
/login
   │
   ▼
¿Usuario autenticado?
   │
   SÍ
   │
   ▼
/dashboard
```

## 🧠 Buenas Prácticas Aplicadas

* Separación entre clientes de Supabase para navegador, servidor y Proxy.
* Uso de Server Components para operaciones del servidor.
* Uso de Server Actions para autenticación.
* Validación de datos en el servidor.
* Gestión de sesiones mediante cookies.
* No almacenamiento de tokens en `localStorage`.
* Uso de HTTPS en producción.
* Variables de entorno fuera del código fuente.
* Mensajes de error seguros.
* Protección de rutas privadas.
* Actualización/refresco de sesiones mediante Proxy.

## 📄 Licencia

Proyecto desarrollado con fines educativos y demostrativos para la implementación de seguridad de autenticación en aplicaciones web modernas con Next.js y Supabase.
