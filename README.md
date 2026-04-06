# 📚 Rutinas de Estudio — Aplicación Fullstack

## 📌 Descripción

Esta aplicación permite gestionar rutinas de estudio mediante operaciones CRUD (crear, listar, actualizar y eliminar).
Está desarrollada con una arquitectura cliente-servidor, utilizando:

* **Backend:** Node.js + Express + Sequelize + MySQL
* **Frontend:** React.js (Vite)

---

## 🎯 Objetivo

El proyecto tiene como objetivo demostrar la implementación de una aplicación fullstack, integrando frontend y backend mediante una API REST.

---

## 🧠 Funcionalidades

* ✔ Crear rutinas de estudio
* ✔ Listar rutinas
* ✔ Editar rutinas
* ✔ Eliminar rutinas
* ✔ Buscar rutinas por materia
* ✔ Manejo de estados de carga y error

---

## 🏗️ Estructura del Proyecto

```
tp2-fullstack/
│
├── backend/
└── frontend/
```

---

# ⚙️ INSTALACIÓN Y EJECUCIÓN

## 🔹 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPO>
cd tp2-fullstack
```

---

## 🔹 2. Backend

### 📁 Ir a la carpeta

```bash
cd backend
```

### 📦 Instalar dependencias

```bash
npm install
```

---

## 🔐 Configuración de variables de entorno

El proyecto incluye un archivo `.env.example` con las variables necesarias.

### 1. Copiar el archivo

```bash
cp .env.example .env
```

### 2. Editar el archivo `.env` (si es necesario)

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=study_routines
```

---

## 🗄️ 3. Base de Datos (MySQL - WAMP)

Crear la base de datos en phpMyAdmin:

```sql
CREATE DATABASE study_routines;

USE study_routines;

CREATE TABLE routines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(100) NOT NULL,
    hours INT NOT NULL,
    priority VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## ▶️ Ejecutar Backend

```bash
npm run dev
```

El servidor correrá en:

```
http://localhost:3000
```

---

## 🔹 4. Frontend

### 📁 Ir a la carpeta

```bash
cd ../frontend
```

### 📦 Instalar dependencias

```bash
npm install
```

---

## ▶️ Ejecutar Frontend

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

## 🔗 Comunicación entre Frontend y Backend

El frontend consume la API REST del backend mediante `fetch`, realizando solicitudes HTTP a:

```
http://localhost:3000/api/routines
```

---

## 🧪 Endpoints disponibles

| Método | Endpoint          | Descripción               |
| ------ | ----------------- | ------------------------- |
| GET    | /api/routines     | Obtener todas las rutinas |
| GET    | /api/routines/:id | Obtener rutina por ID     |
| POST   | /api/routines     | Crear rutina              |
| PUT    | /api/routines/:id | Actualizar rutina         |
| DELETE | /api/routines/:id | Eliminar rutina           |

---

## ⚠️ Consideraciones

* No incluir la carpeta `node_modules` en el repositorio
* Asegurarse de que MySQL (WAMP) esté en ejecución
* El backend debe iniciarse antes que el frontend
* El archivo `.env` no debe subirse al repositorio

---

## 🧠 Decisiones de Desarrollo

* Se utilizó **Sequelize** como ORM para facilitar la interacción con la base de datos
* Se implementó una arquitectura modular en el backend
* El estado en React se maneja con `useState` y `useEffect`
* Se centralizó la lógica en el componente principal (App)

---

## 👩‍💻 Autor

Trabajo práctico realizado para la materia
**Taller de Lenguajes de Programación III (React Native)**

---

💖 Fin del README
