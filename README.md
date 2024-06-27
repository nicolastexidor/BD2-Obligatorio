# Proyecto de Gestión de Alumnos y Partidos

Este proyecto es una aplicación en TypeScript que se conecta a una base de datos PostgreSQL para gestionar alumnos y partidos. Utiliza DTOs (Objetos de Transferencia de Datos) para estructurar y transferir datos.

## Documentacion
En la carpeta Docs del proyecto se puede encontrar tanto la ultima version del informe como las creaciones de tablas e inserts.

## Instalación

Para configurar y ejecutar este proyecto, sigue los siguientes pasos:

### Prerrequisitos

- Tener Node.js y npm instalados en tu sistema.

### Pasos para ejecutar

1. **Instalar dependencias**

   Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```npm install```

2. Modificar config/db.ts

   En el objeto config cambiar los datos con los que corresponden a tu local, agrega el atributo user y password de ser necesario, correspondiendo a tu usuario de PostgreSQL

3. Compila el código TypeScript a JavaScript ejecutando:

```npx tsc```

4. Ejecutar la aplicación

Finalmente, ejecuta el archivo compilado:

```node dist/db.js```

5. Cargar tablas y datos
En su manejador de bases de datos de preferencia, se deben cargar las tablas e inserts que se encuentran en la carpeta Docs 

5. Clonar Front-End
   Se debe clonar el repositorio del FrontEnd

6. Instalar dependencias de Front-End
Al igual que con el Back-End, se deben instalar las dependencias con
 
```npm install```

7. Ejecutar Front-End
Para ejecutar el Front-End se debe usar el siguiente comando:

```npm start```

Proceda registrando un usuario.