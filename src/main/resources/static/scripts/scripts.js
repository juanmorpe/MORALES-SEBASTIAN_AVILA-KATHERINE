async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const config = await response.json();
        return config.API_BASE_URL;
    } catch (error) {
        throw new Error(`Fetch error: ${error.message}`);
    }
}

async function init() {
    try {
        const API_BASE_URL = await loadConfig();
        window.API_BASE_URL = API_BASE_URL;
    } catch (error) {
        console.error('Error:', error);
    }
}

init();


document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const nav = document.getElementById('nav');

    function mostrarOcultarSeccion(idSeccion) {
        // Obtener todas las secciones
        const secciones = document.querySelectorAll('section');
        // Ocultar todas las secciones
        secciones.forEach(seccion => {
            seccion.style.display = 'none';
        });
        
        // Mostrar la sección seleccionada
        const formularioSeccion = document.getElementById(idSeccion + 'Formulario');
        const listaSeccion = document.getElementById(idSeccion  + 'Lista');
        if (formularioSeccion && listaSeccion) {
            formularioSeccion.style.display = 'block';
            listaSeccion.style.display = 'block';
            eval(idSeccion  + "Listar();");
        }
    }
    

    function cargarContenidoDesdeArchivo(seccion){
        mostrarOcultarSeccion(seccion);
    }

    // Manejador de eventos para el icono de menú
    menuIcon.addEventListener('click', function () {
        if (nav.style.left === '0px') {
            nav.style.left = '-250px'; // Oculta el menú
        } else {
            nav.style.left = '0px'; // Muestra el menú
        }
    });

    // Manejadores de eventos para cada opción del menú
    document.getElementById('odontologosMenu').addEventListener('click', function () {
        cargarContenidoDesdeArchivo('odontologos');
        nav.style.left = '-250px'; // Oculta el menú después de hacer clic
    });

    document.getElementById('pacientesMenu').addEventListener('click', function () {
        cargarContenidoDesdeArchivo('pacientes');
        nav.style.left = '-250px'; // Oculta el menú después de hacer clic
    });

    document.getElementById('turnosMenu').addEventListener('click', function () {
        cargarContenidoDesdeArchivo('turnos');
        nav.style.left = '-250px'; // Oculta el menú después de hacer clic
    });

  
});

function mostrarMensaje(mensaje, clase) {
    const mensajeElement = document.getElementById('mensaje');
    mensajeElement.textContent = mensaje;
    mensajeElement.classList.add(clase);

    setTimeout(() => {
        mensajeElement.textContent = '';
        mensajeElement.classList.remove(clase);
    }, 3000); 
}
