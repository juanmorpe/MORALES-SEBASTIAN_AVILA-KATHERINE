// Servicio para odontólogos
const odontologosService = {
    listar: async () => {
        return request('/odontologos', 'GET');
    },
    crear: async (odontologo) => {
        return request('/odontologos/registrar', 'POST', odontologo);
    },
    actualizar: async (odontologo) => {
        return request(`/odontologos/actualizar`, 'PUT', odontologo);
    },
    eliminar: async (id) => {
        return request(`/odontologos/eliminar/${id}`, 'DELETE');
    },
};