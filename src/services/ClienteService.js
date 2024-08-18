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
}