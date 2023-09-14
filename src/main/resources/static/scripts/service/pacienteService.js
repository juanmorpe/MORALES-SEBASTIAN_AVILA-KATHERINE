// Servicio para pacientes
const pacientesService = {
    listar: async () => {
        return request('/pacientes', 'GET');
    },
    crear: async (paciente) => {
        return request('/pacientes/registrar', 'POST', paciente);
    },
    actualizar: async (paciente) => {
        return request(`/pacientes/actualizar`, 'PUT', paciente);
    },
    eliminar: async (id) => {
        return request(`/pacientes/eliminar/${id}`, 'DELETE');
    },
};

