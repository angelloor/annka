# Backend

## Preparando Ambiente

A continuación, listare las herramientas utilizadas para resolver el desafío con sus respectivas versiones y una reproducción para instalarlas.

## NVM

Para no alterar las versiones de NodeJS que pudieran estas utilizando es recomendable instalar NVM para manejar las versiones:

Para windows la puedes instalar siguiendo esta guía:

https://4geeks.com/how-to/nvm-install-windows

Para mac:
https://noviello.it/es/como-instalar-nvm-en-macos-con-homebrew/

Una vez instalado,

1. Arrancar un terminal en modo administrador

2. Instalar NodeJS v18.16.0: nvm install 18.16.0 && nvm use 18.16.0

3. Y listo, ya tienes la versión de NodeJS

## PostgreSQL v13.8

Es necesario instalar PostgreSQL en su versión 13, para lo cual dejo el enlace de descarga: https://www.postgresql.org/download/

una vez instalado, se tiene que crear la base de datos con el script que está en la siguiente ruta: **./db/create.sql**

una vez creada la base de datos, hay que confirmar las variables de entorno, en la siguiente ruta: **./env/development.env**

Digo confirmar por si establecen otra contraseña para el servidor de PG, las variables de entorno de MAILER\_\*, no es necesario tocarlas ya que son las correctas para realizar él envió de correos.

**Nota:** la carpeta de ./env no se subirá a GitHub por motivos de seguridad, así que la enviare por correo electrónico, por favor, colocarla en la raíz del proyecto.

## Postman

También es necesario instalar Postman o Insomnia (De preferencia Postman), una vez instalado, se tiene que importar la colección que está ubicada en **./postman/ANNKA Backend.postman_collection**

## Instrucciones de Ejecución

Una vez hecho todo esto, lo siguiente a realizar es:

1. Descargar el proyecto del repositorio.
2. Accedemos a él.
3. Instalamos las dependencias: **npm i**
4. Ejecutamos el servidor en desarrollo y en ts: **npm run server-dev-ts**
5. Una vez que el servidor ya este levantado, podemos hacer uso de los EndPoints.

La documentación de los EndPoints te la dejare en otro archivo con el nombre: **EndPoints.md**

Eso debería ser todo para que puedas ver funcionando la aplicación.

## Pruebas

Como mencione antes solo he realizado pruebas unitarias, dejo ahí una prueba unitaria de la validación de la cedula 😁
**npm run test**

## ¡Gracias por su tiempo!

Si tienes alguna pregunta o necesitas más información, no dudes en contactarme.

¡Saludos cordiales!

Angel Loor
angelloor.dev@gmail.com
+593 99 867 9628
