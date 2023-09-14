const listaOdontologos = document.getElementById('listaOdontologos');
let odontologos = null;

const formularioOdontologo = document.getElementById('crearOdontologoForm');
const idOdontologoInput = document.getElementById('idOdontologo');
const matriculaOdontologoInput = document.getElementById('matriculaOdontologo');
const nombreOdontologoInput = document.getElementById('nombreOdontologo');
const apellidoOdontologoInput = document.getElementById('apellidoOdontologo');
const botonCrearOdontologo = document.getElementById('crearOdontologoButton');

botonCrearOdontologo.addEventListener('click', limpiarOdontologoForm);
formularioOdontologo.addEventListener('submit', odontologoGuardar);

function odontologosJSONaCards(odontologos) {
    odontologos.forEach((odontologo, index) => {
      const card = document.createElement('div');
      card.className = 'card';

      const cardContent = `
        <h2>Doctor: ${odontologo.nombre}  ${odontologo.apellido}</h2>
        <p>Matrícula: ${odontologo.matricula}</p>
        <div class="card-buttons">
          <button class="edit-button" onclick="odontologosEditar(${index})">Editar</button>
          <button class="delete-button" onclick="odontologosEliminar(${odontologo.id})">Eliminar</button>
        </div>
      `;

      card.innerHTML = cardContent;

      listaOdontologos.appendChild(card);
    });
}

function limpiarOdontologoForm(){
    idOdontologoInput.value = '';
    matriculaOdontologoInput.value = '';
    nombreOdontologoInput.value = '';
    apellidoOdontologoInput.value = '';

}

async function odontologoGuardar(event){
    event.preventDefault(); 

    const id = idOdontologoInput.value;
    const matricula = matriculaOdontologoInput.value;
    const nombre = nombreOdontologoInput.value;
    const apellido = apellidoOdontologoInput.value;

    const odontologo = {
        id,
        matricula,
        nombre,
        apellido
    };

    try {
        if(id > 0){
            await odontologosActualizar(odontologo);
        }else{
            await odontologosCrear(odontologo);
        }
        limpiarOdontologoForm();

        await odontologosListar();        
        mostrarMensaje('Odontólogo guardado con éxito', 'success');  

    } catch (error) {
        console.error('Error al guardar el odontólogo:', error);
    }    
}

function odontologosEditar(id) {
    const odontologo = odontologos[id];
    idOdontologoInput.value = odontologo.id;
    matriculaOdontologoInput.value = odontologo.matricula;
    nombreOdontologoInput.value = odontologo.nombre;
    apellidoOdontologoInput.value = odontologo.apellido;
}

async function odontologosListar() {
    try {
        odontologos = await odontologosService.listar();
        listaOdontologos.innerHTML = '';
        odontologosJSONaCards(odontologos);
        limpiarOdontologoForm()
    } catch (error) {
        console.error('Error al listar odontologos:', error);
    }
}

async function odontologosCrear(odontologo) {
    try {
        const nuevoOdontologo = await odontologosService.crear(odontologo);
    } catch (error) {
        mostrarMensaje('Error al crear odontologo', 'error');
    }
}

async function odontologosActualizar(odontologo) {
    try {
        const editarOdontologo = await odontologosService.actualizar(odontologo);
    } catch (error) {
        mostrarMensaje('Error al editar odontologo', 'error');
    }
}

async function odontologosEliminar(id) {
   try {
        const confirmarEliminacion = confirm('¿Está seguro de que desea eliminar a este odontólogo?');
        if(confirmarEliminacion){
            await odontologosService.eliminar(id);
            mostrarMensaje('Se ha eliminado el odontólogo con id '  +  id, 'success');  
            await odontologosListar();
        }
    } catch (error) {
        mostrarMensaje('Error al eliminar odontologo', 'error');
    }
}
