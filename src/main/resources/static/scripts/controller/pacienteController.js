const listaPacientes = document.getElementById('listaPacientes');
let pacientes = null;
const formularioPaciente = document.getElementById('crearPacienteForm');
const idPacienteInput = document.getElementById('idPaciente');
const domicilioIdPacienteInput = document.getElementById('idDomicilio');
const nombrePacienteInput = document.getElementById('nombrePaciente');
const apellidoPacienteInput = document.getElementById('apellidoPaciente');
const dniPacienteInput = document.getElementById('dniPaciente');
const fechaIngresoPacienteInput = document.getElementById('fechaIngresoPaciente');
const callePacienteInput = document.getElementById('callePaciente');
const numeroPacienteInput = document.getElementById('numeroPaciente');
const localidadPacienteInput = document.getElementById('localidadPaciente');
const provinciaPacienteInput = document.getElementById('provinciaPaciente');
const botonCrearPaciente = document.getElementById('crearPacienteButton');

botonCrearPaciente.addEventListener('click', limpiarPacienteForm);
formularioPaciente.addEventListener('submit', pacienteGuardar);

function pacientesJSONaCards(pacientes) {
    pacientes.forEach((paciente, index) => {
      const card = document.createElement('div');
      card.className = 'card';

      const cardContent = `
        <h2>Nombre: ${paciente.nombre}  ${paciente.apellido}</h2>
        <p>DNI: ${paciente.dni}</p>
        <div class="card-buttons">
          <button class="edit-button" onclick="pacientesEditar(${index})">Editar</button>
          <button class="delete-button" onclick="pacientesEliminar(${paciente.id})">Eliminar</button>
        </div>
      `;

      card.innerHTML = cardContent;

      listaPacientes.appendChild(card);
    });
}

function limpiarPacienteForm(){
    idPacienteInput.value  = ''
    domicilioIdPacienteInput.value = ''
    nombrePacienteInput.value = '';
    apellidoPacienteInput.value = '';
    dniPacienteInput.value = '';
    fechaIngresoPacienteInput.value = '';
    callePacienteInput.value = '';
    numeroPacienteInput.value = '';
    localidadPacienteInput.value = '';
    provinciaPacienteInput.value = '';
}

async function pacienteGuardar(event){
    event.preventDefault();

    const id = idPacienteInput.value;
    const domiclioId = domicilioIdPacienteInput.value;
    const nombre = nombrePacienteInput.value;
    const apellido = apellidoPacienteInput.value;
    const dni = dniPacienteInput.value;
    const fechaIngreso = fechaIngresoPacienteInput.value;
    const calle = callePacienteInput.value;
    const numero = numeroPacienteInput.value;
    const localidad = localidadPacienteInput.value;
    const provincia = provinciaPacienteInput.value;

    const paciente = {
        id,
        nombre,
        apellido,
        dni,
        fechaIngreso,
        domicilio: {
            domiclioId,
            calle,
            numero,
            localidad,
            provincia
        }
    };

    try {
        if(id > 0){
            await pacientesActualizar(paciente);
        }else{
            await pacientesCrear(paciente);
        }

        limpiarPacienteForm();

        pacientesListar();
        mostrarMensaje('Paciente guardado con éxito', 'success');

    } catch (error) {
        console.error('Error al guardar el paciente:', error);
    }    
}

function pacientesEditar(id) {
    const paciente = pacientes[id];   

    idPacienteInput.value = paciente.id;
    domicilioIdPacienteInput.value = paciente.domicilio.id;
    nombrePacienteInput.value = paciente.nombre;
    apellidoPacienteInput.value = paciente.apellido;
    dniPacienteInput.value = paciente.dni;
    fechaIngresoPacienteInput.value = paciente.fechaIngreso;
    callePacienteInput.value = paciente.domicilio.calle;
    numeroPacienteInput.value = paciente.domicilio.numero;
    localidadPacienteInput.value = paciente.domicilio.localidad;
    provinciaPacienteInput.value = paciente.domicilio.provincia;
}

async function pacientesListar() {
    try {
        pacientes = await pacientesService.listar();
        listaPacientes.innerHTML = '';
        pacientesJSONaCards(pacientes);
        limpiarPacienteForm();
    } catch (error) {
        console.error('Error al listar pacientes:', error);
    }
}

async function pacientesCrear(paciente) {
    try {
        const nuevoPaciente = await pacientesService.crear(paciente);
    } catch (error) {
        mostrarMensaje('Error al crear paciente', 'error');
    }
}

async function pacientesActualizar(paciente) {
    try {
        const editarPaciente = await pacientesService.actualizar(paciente);
    } catch (error) {
        mostrarMensaje('Error al editar paciente', 'error');
    }
}

async function pacientesEliminar(id) {
   try {
        const confirmarEliminacion = confirm('¿Está seguro de que desea eliminar a este paciente?');
        if(confirmarEliminacion){
            await pacientesService.eliminar(id);
            mostrarMensaje('Se ha eliminado el paciente con id '  +  id, 'success');  
            await pacientesListar();
        }
    } catch (error) {
        mostrarMensaje('Error al eliminar paciente', 'error');
    }
}
