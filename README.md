# Tienda Online

Aplicación web en React + Vite para simular una tienda online con dos roles: cliente y administrador. Consume una API REST desarrollada con Node.js, Express y MySQL.

## Funcionalidades

- Registro e inicio de sesión.
- Persistencia de token y rol en `localStorage`.
- Vista de productos con carrito de compras.
- Creación de pedidos e historial del cliente.
- Panel administrativo con clientes, pedidos, productos y creación de administradores.
- CRUD de productos desde el panel de administración.

## Tecnologías

- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Node.js / Express
- MySQL

## Instalación

### Frontend

```bash
cd frontend/Tienda
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Variables de entorno del backend

Crear un archivo `.env` en la carpeta `backend` con valores similares a estos:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tu_base_de_datos
JWT_SECRET=tu_secreto_jwt
```

## API

La documentación Swagger está disponible en:

`http://localhost:5000/api-docs`

### Endpoints principales

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/register-admin`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/orders`
- `GET /api/orders/user`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/status`
- `GET /api/users`
- `GET /api/users/:id`

## Credenciales de prueba

Las credenciales dependen de los datos cargados en tu base de datos. Como referencia, el Swagger del proyecto usa estos ejemplos:

- Cliente: `cristian@test.com` / `123456`
- Administrador: `admin@test.com` / `123456`

Si tu base aún no tiene usuarios sembrados, regístralos primero desde la aplicación o inserta datos de prueba manualmente.

## Estructura general

- Cliente: tienda, carrito, pedido e historial.
- Administrador: dashboard, clientes, pedidos, productos y alta de administradores.

## Notas

- El carrito se guarda localmente para mantener el estado entre recargas.
- El backend protege las rutas sensibles con JWT y validación por rol.
