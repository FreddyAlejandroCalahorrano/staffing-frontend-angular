# Microfrontend Template

Este proyecto representa un template para construir una aplicacion de tipo microfrontend

## Requerimientos

* [Node v12.14.1 o superior](https://nodejs.org/es/)

* Configurar el el .npmrc con la siguiente configuracion

```bash
@pichincha:registry=https://everispichincha.jfrog.io/artifactory/api/npm/development-npm-local/
```

Nota: Esta configuracion es provisional

## Instalacion

Ingresar a la raiz de la carpeta y ejecutar el siguiente comando:

```sh
npm install
```

## Modo de desarrollo

Para poder correr el proyecto localmente es necesario ejecutar el siguiente comando:
```sh
npm run start
```

La aplicacion estara corriendo el puerto 4201, por ende abrir el navegador con la siguiente direccion `http://localhost:4201/` y veremos la aplicacion corriendo.

## Estructura de carpetas

* directives: Carpeta para incluir las directivas que se usaran en el proyecto shell.
* pipes: Carpeta para incluir los pipes que se usaran en el proyecto shell.
* services: Carpeta para incluir los servicios a usar en el proyecto shell.
* components: Carpeta para incluir componentes que son de tipo de UI
* views: Carpeta para incluir componentes que tienen logica y son integradores con los componentes presentes en la carpeta components
* types: Carpeta para incluir todos los types para funciones, request, etc.
* layouts: Carpeta para crear layouts que permitan integrar los microfrontend.
* guard: Carpeta para incluir los guards necesarios que tendran los layouts o las rutas propias del shell.

## Compilacion

La compilacion puede ser ejecutado para diferentes ambientes, si se quiere compilar para el ambiente produccion se puede ejecutar el siguiente comando:
```sh
npm run build:prod
```

Revisar el package.json para conocer el listado de los comandos

## Test unitarios

Para correr los test unitarios de la aplicacion, se debe ejecutar el siguiente comando:

```sh
npm run test
```
## Revision de estilo de codigo

Para realizar la revision del estilo de codigo se debe ejecutar el siguiente comando:
```sh
npm run lint
```