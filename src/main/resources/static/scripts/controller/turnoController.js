const formularioTurno = document.getElementById('crearTurnoForm');
const listaTurnos = document.getElementById('listaTurnos');
let turnos = null;

const idTurnoInput = document.getElementById('idTurno');
const pacienteIdTurnoInput = document.getElementById('pacienteIdTurno');
const odontologoIdTurnoInput = document.getElementById('odontologoIdTurno');
const fechaYHoraTurnoInput = document.getElementById('fechaYHoraTurno');
const botonCrearTurno = document.getElementById('crearTurnoButton');

botonCrearTurno.addEventListener('click', limpiarTurnoForm);
formularioTurno.addEventListener('submit', turnoGuardar);

function turnosJSONaCards(turnos) {
    turnos.forEach((turno, index) => {
      const card = document.createElement('div');
      card.className = 'card';

      const cardContent = `
        <h2>Turno número: ${turno.id}</h2>
        <p>Doctor: ${turno.odontologoTurnoSalidaDto.nombre}  ${turno.odontologoTurnoSalidaDto.apellido}</p>
        <p>Paciente: ${turno.pacienteTurnoSalidaDto.nombre}  ${turno.pacienteTurnoSalidaDto.apellido}</p>
        <p>Fecha y hora: ${turno.fechaYHora}</p>
        <div class="card-buttons">
          <button class="edit-button" onclick="turnosEditar(${index})">Editar</button>
          <button class="delete-button" onclick="turnosEliminar(${turno.id})">Eliminar</button>
        </div>
      `;

      card.innerHTML = cardContent;

      listaTurnos.appendChild(card);
    });
}

function limpiarTurnoForm(){
    idTurnoInput.value  = ''
    pacienteIdTurnoInput.value  = ''
    odontologoIdTurnoInput.value = ''
    fechaYHoraTurnoInput.value = '';
    llenarPacientesSelect();
    llenarOdontologosSelect();    
}

async function llenarPacientesSelect() {
    try {
        const pacientes = await pacientesService.listar();

        pacienteIdTurnoInput.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecciona un paciente';
        pacienteIdTurnoInput.appendChild(defaultOption);

        pacientes.forEach((paciente) => {
            const option = document.createElement('option');
            option.value = paciente.id;
            option.textContent = `${paciente.nombre} ${paciente.apellido}`;
            pacienteIdTurnoInput.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar la lista de pacientes:', error);
    }
}

async function llenarOdontologosSelect() {
    try {
        const odontologos = await odontologosService.listar();

        odontologoIdTurnoInput.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecciona un odontólogo';
        odontologoIdTurnoInput.appendChild(defaultOption);

        odontologos.forEach((odontologo) => {
            const option = document.createElement('option');
            option.value = odontologo.id;
            option.textContent = `${odontologo.nombre} ${odontologo.apellido}`;
            odontologoIdTurnoInput.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar la lista de odontólogos:', error);
    }
}

async function turnoGuardar(event){
    event.preventDefault();

    const id = idTurnoInput.value;
    const pacienteId = pacienteIdTurnoInput.value;
    const odontologoId = odontologoIdTurnoInput.value;
    const fechaYHora = (fechaYHoraTurnoInput.value).replace("T", " ");

    const turno = {
        id,
        pacienteId,
        odontologoId,
        fechaYHora
    };

    try {
        if(id > 0){
            await turnosActualizar(turno);
        }else{
            await turnosCrear(turno);
        }
        limpiarTurnoForm();

        turnosListar();
        mostrarMensaje('Turno guardado con éxito', 'success');

    } catch (error) {
        console.error('Error al guardar el turno:', error);
    }    
}

function turnosEditar(id) {
    const turno = turnos[id];   

    idTurnoInput.value = turno.id;
    pacienteIdTurnoInput.value = turno.pacienteTurnoSalidaDto.id;
    odontologoIdTurnoInput.value = turno.odontologoTurnoSalidaDto.id;
    fechaYHoraTurnoInput.value = turno.fechaYHora;
}

async function turnosListar() {
    try {
        turnos = await turnosService.listar();
        listaTurnos.innerHTML = '';
        turnosJSONaCards(turnos);
        limpiarTurnoForm();
    } catch (error) {
        console.error('Error al listar turnos:', error);
    }
}

async function turnosCrear(turno) {
    try {
        const nuevoTurno = await turnosService.crear(turno);
        if(nuevoTurno.error){
            throw new Error(`Error: ${nuevoTurno.message}`);
        }
    } catch (error) {
        mostrarMensaje('Error al crear turno', 'error');
    }
}

async function turnosActualizar(turno) {
    try {
        const editarTurno = await turnosService.actualizar(turno);
    } catch (error) {
        mostrarMensaje('Error al editar turno', 'error');
    }
}

async function turnosEliminar(id) {
   try {
        const confirmarEliminacion = confirm('¿Está seguro de que desea eliminar a este turno?');
        if(confirmarEliminacion){
            await turnosService.eliminar(id);
            mostrarMensaje('Se ha eliminado el turno con id '  +  id, 'success');  
            await turnosListar();
        }
    } catch (error) {
        mostrarMensaje('Error al eliminar turno', 'error');
    }
}

