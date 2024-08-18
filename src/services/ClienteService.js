import api from "../lib/axios"

export default {
    obtenerCLientes() {
        return api.get("/clientes")
    },
    agregarCLiente(data) {
        return api.post("/clientes", data)
    },
    obtenerCLiente(id) {
        return api.get(`/clientes/${id}`)
    },
    actualizarCLiente(id, data) { // v218
        // return api.put(`/clientes/${id}`, data)
        return api.patch(`/clientes/${id}`, data)
    },
    cambiarEstado(id, data) { // v219
        // console.log(id)
        // console.log(data)
        return api.patch(`/clientes/${id}`, data)
    },
    eliminarCliente(id) { // v220
        return api.delete(`/clientes/${id}`)
    },
}

/* 
ACCION                  | URL           | Verbo HTTP
Obtener Clientes        | /clientes     | GET
Registrar Cliente       | /clientes     | POST
Obtener un solo Cliente | /clientes/:id | GET
Actualizar un Cliente   | /clientes/:id | PUT o PATCH
Eliminar un Cliente     | /clientes/:id | DELETE
*/