# Importante
Para ejecutar el programa necesitas un .env con las siguientes variables:
- PORT=3000
- MONGO_URI=mongodb://localhost:27017/web_project
- JWT_SECRET=supersecretkey


# Sistema de Merchandising

## Descripción

El **Sistema de Merchandising** es una plataforma moderna y eficiente para gestionar productos, colecciones y categorías de merchandising. Este sistema permite a los usuarios administrar de manera sencilla sus inventarios de productos, categorizarlos, realizar búsquedas por filtros y llevar un control completo del flujo de mercancías.

### Funcionalidades Principales:

- **Gestión de Productos**: Los usuarios pueden registrar, editar y eliminar productos con facilidad.
- **Autenticación Segura**: Los usuarios pueden registrarse e iniciar sesión utilizando **JWT (JSON Web Tokens)** para garantizar un acceso seguro a la plataforma.
- **Interfaz Interactiva**: Con **Alpine.js**, la interfaz es completamente dinámica y reactiva para una experiencia de usuario fluida.

## Tecnologías Utilizadas

- **Mongoose**: ORM para **MongoDB**, facilitando la interacción con la base de datos y la creación de modelos de datos.
- **Express**: Framework de **Node.js** para la creación de una API RESTful, gestionando las rutas y peticiones del backend.
- **Alpine.js**: Framework ligero y reactivo en el frontend, que permite crear interfaces interactivas y eficientes sin sobrecargar la aplicación.
- **JWT (JSON Web Tokens)**: Sistema de autenticación y autorización de usuarios, asegurando que solo los usuarios autenticados puedan acceder a funcionalidades restringidas.
- **MongoDB**: Base de datos **NoSQL** utilizada para almacenar usuarios, productos, categorías y colecciones de manera flexible y escalable.
- **HTML5** y **CSS3**: Tecnologías utilizadas para estructurar y estilizar la interfaz de usuario, garantizando una experiencia visual atractiva y responsive.

## Características del Proyecto

- **Interfaz Reactiva**: La aplicación hace uso de **Alpine.js** para crear una experiencia de usuario dinámica y eficiente, permitiendo realizar operaciones de forma rápida y con retroalimentación inmediata.
- **Autenticación y Seguridad**: Implementación de **JWT** para autenticar a los usuarios, asegurando un acceso controlado y seguro a las funcionalidades del sistema.
- **Backend Escalable con Express**: El sistema utiliza **Express** para gestionar las peticiones, realizando operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de manera eficiente y escalable.
- **API RESTful**: La plataforma ofrece una **API RESTful** que facilita la integración con otros sistemas y permite la gestión centralizada de productos, colecciones y usuarios.

## Proximas Versiones
- **Gestión de Colecciones**: Organiza los productos en colecciones para una mejor administración.
- **Gestión de Productos por Categorías**: Los productos pueden organizarse y filtrarse por categorías como **Electrónica**, **Ropa**, **Juguetes**, etc., mejorando la usabilidad y organización.

# Diagrama UML para el Proyecto de Merchandising

![TPB1JiCm38RlUOfez_KHqAI90mSa1De3XCHq0JUPucI0fhqxopeHrrrxgx_V_ktetr0sAPS1rS7OBzE3Nhr1Ea9QQNLI-l9PD4IQhiNka_JfhCwggRSnVFY-99Dz3A89ml6EFAU828bMccjDoVi6Qnk3jXPjTLYK0C808JCkd9-zSmZV9i7SkB5PLtI0OjKTpTot_mkI88_ZNhS1zLjhxzXFC0EqNtRgqwYQxlCQIuOxJpVM5vzDOlvaZN](https://github.com/user-attachments/assets/15e5b912-e244-44a7-8554-66b8ac201bc2)

