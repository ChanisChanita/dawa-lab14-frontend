# Marketplace Frontend

Aplicación web de e-commerce con Next.js 16, TypeScript y Tailwind CSS.

## 🚀 Características

- ✅ Autenticación de usuarios (Login/Registro)
- ✅ Filtrado por categorías
- ✅ Vista de detalle de productos
- ✅ Panel de administración (solo ADMIN)
- ✅ Diseño responsive con Tailwind CSS
- ✅ Imágenes optimizadas con Next.js Image
- ✅ Credenciales visibles en UI de login

## 📋 Requisitos

- Node.js 18+
- Backend API ejecutándose

## 💻 Instalación Local

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🔑 Credenciales de Prueba

Las credenciales se muestran directamente en la página de login con botones para autocompletar:

**ADMIN:**
- Email: `admin@marketplace.com`
- Password: `admin123`
- Acceso: Panel de administración completo

**CUSTOMER:**
- Email: `cliente@marketplace.com`
- Password: `cliente123`
- Acceso: Vista pública de productos

## 📄 Páginas

- `/` - Lista de productos con filtro por categorías (público)
- `/products/[id]` - Detalle de producto (público)
- `/login` - Inicio de sesión con credenciales visibles
- `/register` - Registro de nuevos usuarios
- `/admin` - Panel CRUD de productos (solo ADMIN)

## 🎨 Tecnologías

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Estado:** React Context API
- **Imágenes:** Next.js Image optimizado

---

## 🌐 Despliegue en Vercel

### Paso 1: Preparar el Repositorio

1. Asegúrate de tener todos los cambios en Git:
```bash
git add .
git commit -m "Frontend ready for deployment"
git push origin main
```

### Paso 2: Conectar con Vercel

1. Ve a [Vercel](https://vercel.com) y crea una cuenta (puedes usar GitHub)
2. Click en **"Add New..."** → **"Project"**
3. Importa tu repositorio de GitHub
4. Selecciona el repositorio del proyecto

### Paso 3: Configurar el Proyecto

Vercel detectará automáticamente que es un proyecto Next.js.

**Framework Preset:** Next.js ✅ (detectado automáticamente)

**Root Directory:** 
- Click en **"Edit"**
- Selecciona: `frontend-marketplace`

**Build Settings:**
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

### Paso 4: Variables de Entorno

En la sección **"Environment Variables"**, agrega:

```env
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com/api
```

⚠️ **Importante:** Reemplaza `https://tu-backend.onrender.com` con la URL real de tu backend en Render.

**Ejemplo:**
```env
NEXT_PUBLIC_API_URL=https://marketplace-backend-xyz.onrender.com/api
```

### Paso 5: Deploy

1. Click en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel construye tu aplicación
3. Una vez completado, obtendrás una URL como:
   - `https://tu-proyecto.vercel.app`
   - `https://tu-proyecto-git-main-tuusuario.vercel.app`

### Paso 6: Actualizar CORS en Backend

Después de obtener tu URL de Vercel, actualiza el backend:

1. Ve a tu servicio en Render
2. En **"Environment"**, asegúrate de tener estas variables o actualiza `src/app.js`:

El CORS ya está configurado para aceptar Vercel:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://*.vercel.app'],
  credentials: true
}));
```

3. Si es necesario, redeploy el backend

### Paso 7: Verificar

1. Abre tu URL de Vercel: `https://tu-proyecto.vercel.app`
2. Ve a `/login`
3. Prueba las credenciales de prueba
4. Verifica que los productos se carguen correctamente

---

## 🔧 Configuración de Variables de Entorno

### Desarrollo Local (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Producción (Vercel)
```env
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com/api
```

---

## 📝 Scripts Disponibles

```bash
npm run dev      # Desarrollo (localhost:3000)
npm run build    # Build de producción
npm start        # Servidor de producción
npm run lint     # Ejecutar ESLint
```

---

## 🚀 Despliegue Automático

Vercel está configurado para:
- ✅ **Deploy automático** en cada push a `main`
- ✅ **Preview deployments** para cada pull request
- ✅ **Optimización automática** de imágenes y assets
- ✅ **Cache inteligente** para mejor performance

---

## 🐛 Solución de Problemas

### Frontend no carga productos
- Verifica que `NEXT_PUBLIC_API_URL` esté correcta en Vercel
- Asegúrate de que el backend esté activo en Render
- Revisa la consola del navegador (F12) para errores de CORS

### Error 401 en panel admin
- Asegúrate de estar logueado con credenciales de ADMIN
- El token JWT expira después de 24 horas
- Cierra sesión y vuelve a iniciar sesión

### Imágenes no cargan
- Verifica `next.config.ts` tenga los `remotePatterns` correctos
- Asegúrate de que las URLs de imagen sean válidas
- Revisa la consola del navegador para errores

### Backend se duerme (plan Free de Render)
- La primera petición después de 15 minutos de inactividad tardará ~30 segundos
- Considera usar un servicio de "keep-alive" o actualizar a un plan pagado

---

## 🎯 Características Implementadas

### Autenticación
- ✅ Login con JWT
- ✅ Registro de usuarios
- ✅ Context global de autenticación
- ✅ Persistencia en localStorage
- ✅ Credenciales visibles en UI

### Protección de Rutas
- ✅ `/admin` solo para ADMIN
- ✅ Rutas públicas para productos
- ✅ Redirección automática según rol

### UI/UX
- ✅ Diseño responsive
- ✅ Navbar con info de usuario
- ✅ Filtros por categoría
- ✅ Imágenes optimizadas
- ✅ Loading states
- ✅ Mensajes de error

---

## 📚 Más Información

- [Documentación de Vercel](https://vercel.com/docs)
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
