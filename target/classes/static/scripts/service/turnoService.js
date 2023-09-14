// Servicio para turnos
const turnosService = {
    listar: async () => {
        return request('/turnos', 'GET');
    },
    crear: async (turno) => {
        return request('/turnos/registrar', 'POST', turno);
    },
    actualizar: async (turno) => {
        return request(`/turnos/actualizar`, 'PUT', turno);
    },
    eliminar: async (id) => {
        return request(`/turnos/eliminar/${id}`, 'DELETE');
    },
};
