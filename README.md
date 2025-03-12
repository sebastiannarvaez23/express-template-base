# Template Base Express

**Empieza tu backend en express** aplicando buenas practicas y utilizando la arquitectura hexagonal con vertical slicing. Todo esto de forma rapida y organizada.

### Características

- **Usuarios**: CRUD de usuarios.
- **Personas**: CRUD de personas.
- **Roles y Servicios**: Asigna recursos mediante codigos, estos se los asignas a los roles y cada persona puede tener distintos roles.
- **Middlewares**: Middlewares predefinidos.
- **Autenticación**: JWT y sistema White List incluido.

### Alternativas

Existen diferentes Frameworks como Django que cuenta con estas caracteristicas y más para desarrollar un backend robusto, sin embargo esta plantilla cuenta con la base escalable para una arquitectura basada en microservicios con distribución hexagonal, pruebala y hazla tan flexible como la necesites.

## Insignias

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Tecnologías Utilizadas

- **Express**: Para la construcción del servidor web.
- **TypeScript**: Como lenguaje de tipado para mejorar la seguridad.
- **Sequelize**: ORM para gestionar la base de datos.
- **NodeJS**: Marco de trabajo de Express.
- **Docker**: Containerización de bases de datos.
- **GIT**: Sistema de versionamiento de código.
- **Postgresql**: Sistema de base de datos de la aplicación.
- **Redis**: Sistema de base de datos de caché.
- **Kafka**: Comunicación entre microservicios.

<p align="left">
  <img src="https://github.com/user-attachments/assets/13496a22-10a0-4e91-8ec2-7286f43ee6e3" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/b2972b29-f40e-488a-aadd-ef4372659a4e" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/3824bcf1-0ba3-4881-a7d1-1bd2f0434b12" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/4a347abe-6baa-40da-84ad-47e9b81f3017" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/0e8b5d78-b2e3-441e-9047-216c65683658" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/07fd9bed-e2a5-4933-af2c-caa359652598" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/8abd3fce-7bcc-4c24-9a4a-a4d767846f26" width="auto" height="90">
</p>

## Instalación

### Requisitos

- Node.js = 16.0
- npm = 10.2.0
- CLI = 16.2.14

### Pasos

1. Instala las dependencias:
   ```bash
   $ npm install
   ```
2. Transpila el codigo a JavaScript:
   ```bash
   $ npm run build
   ```
3. Levanta los contenedores:
   ```bash
   $ docker-compose up -d
   ```
4. Ejecuta las migraciones:
   ```bash
   $ npm run migrate
   ```
5. Inicia el servidor de desarrollo:
   ```bash
   $ npm run start
   ```
   <b>Nota 1:</b> Para revertir las migraciones realizadas ejecuta:

```bash
$ npm run unmigrate
```

<b>Nota 2:</b> Luego de generar el build del backend deberás copiar tu archivo `.env` en la raiz del directorio dist, esto con el fin de que las variables se tomen correctamente al momento de generar las migraciones.

Luego de la ejecución de las migraciones y el inicio del servidor de desarrollo vas a lograr hacer pruebas con un usuario admin que tiene los permisos para consumir todos los servicios. Importa la colección de Postman adjunta en este proyecto y prueba cada uno de los servicios disponibles.
