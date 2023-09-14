## _Digital House, Backend I_

Proyecto final de Backend I en SpringBoot

Por: Juan Morales & Katherine Ávila
## Tecnologías
- Java
- JPA
- Maven
- JUnit
- Logger
- H2
- Bean Validation
- Swagger
- Spring Web

# Nombre del Proyecto

Clínica Odontológica

## Requisitos

Asegúrate de tener instalados los siguientes requisitos antes de comenzar:

- [Java](https://www.oracle.com/java/technologies/javase-downloads.html) 11 o superior
- [Maven](https://maven.apache.org/download.cgi)
- [Git](https://git-scm.com/downloads)

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

1. Clona el repositorio de Git en tu máquina local:

   ```bash
    git clone https://github.com/juanmorpe/MORALES-SEBASTIAN_AVILA-KATHERINE.git

2. Navega al directorio del proyecto:
   ```bash
    cd nombre-del-repositorio

3. Compila el proyecto con Maven:
   ```bash
    mvn clean install
    
4. Configuración
Antes de ejecutar el proyecto, debes configurar algunas variables de entorno y archivos de configuración. Asegúrate de verificar los siguientes archivos:

src/main/resources/application.properties - Configuración de la base de datos y otras propiedades de la aplicación.
Ejecución
Para ejecutar el proyecto, utiliza el siguiente comando Maven:
   ```bash
   mvn spring-boot:run
```

El servidor de desarrollo se ejecutará en http://localhost:8081. Puedes acceder a la documentación de Swagger en http://localhost:8081/swagger-ui.html.

## Configuración front
En la carpeta resources/static

En el archivo config.json ubicar el atributo API_BASE_URL y allí poner la URL y el puerto donde se ejecuta el proyecjo de SpringBoot Clínica odontologica

const API_BASE_URL = 'http://localhost:8081';

Para utilizar "Live Server" en Visual Studio Code, sigue estos pasos:

Instala Visual Studio Code: Si aún no tienes Visual Studio Code instalado, puedes descargarlo desde el sitio web oficial: Descargar Visual Studio Code.

Abre tu proyecto en Visual Studio Code: Abre la carpeta de tu proyecto en Visual Studio Code.

Instala la extensión "Live Server":

Abre Visual Studio Code.
Ve a la pestaña "Extensions" en la barra lateral izquierda (o presiona Ctrl+Shift+X o Cmd+Shift+X en Mac) para abrir el mercado de extensiones.
En el campo de búsqueda, escribe "Live Server".
Haz clic en la extensión "Live Server" ofrecida por Ritwick Dey y presiona el botón "Install" para instalarla.
Inicia el servidor en vivo:

Después de instalar la extensión, ve al archivo HTML que deseas abrir en el servidor en vivo.
Haz clic con el botón derecho en el archivo HTML en el explorador de archivos de Visual Studio Code.
Selecciona "Open with Live Server" en el menú contextual.
Esto abrirá el archivo HTML en tu navegador web predeterminado y comenzará un servidor local en vivo que sirve el archivo y actualiza automáticamente cuando realizas cambios en el código.
Usa Live Server:

A medida que realizas cambios en tu código HTML, CSS o JavaScript en Visual Studio Code, Live Server los detectará y actualizará automáticamente la página en tu navegador sin necesidad de recargar manualmente.
Detener el servidor:

Puedes detener el servidor en vivo en cualquier momento haciendo clic en el icono de "Stop" (un círculo rojo) que se encuentra en la esquina superior derecha de tu ventana de Visual Studio Code o en la barra de estado en la parte inferior.

## Contribución
Si deseas contribuir a este proyecto, sigue estos pasos:

Crea un fork del proyecto en GitHub.
Crea una nueva rama para tu contribución: git checkout -b mi-contribucion.
Realiza tus cambios y haz commit: git commit -m "Añadir mi contribución".
Sube los cambios a tu repositorio: git push origin mi-contribucion.
Crea una solicitud de extracción (pull request) en GitHub.
