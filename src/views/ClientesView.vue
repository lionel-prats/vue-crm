<script setup>

    import {onMounted, ref, computed} from "vue"

    // import axios from "axios"
    // import axios from "../lib/axios" // v209
    import ClienteService from "../services/clienteService" // v210

    // import {RouterLink} from "vue-router"
    import RouterLink from "../components/UI/RouterLink.vue"
    import Heading from "../components/UI/Heading.vue"
    import Cliente from "../components/Cliente.vue"

    defineProps({
        titulo: {
            type: String,
        }
    })
    const clientes = ref([]) // state

    // axios con promises
    onMounted(() => {
        // axios/* .get */("/clientes") // get es el tipo de peticion por default de Axios, por eso no hace falta especificarlo (v203)
        ClienteService.obtenerCLientes()
            .then(({data}) => clientes.value = data)
            .catch(error => console.log("Hubo un error"))  
    })

    const existenClientes = computed( () => {
        return clientes.value.length > 0
    })
</script>
<template>
    <div>
        <div class="flex justify-end">
            <!-- <RouterLink 
                :to="{name: 'agregar-cliente'}"
                class="block md:inline-block rounded bg-blue-600 py-2 px-3"    
            >    
                Agregar CLiente
            </RouterLink> -->
            <RouterLink to="agregar-cliente">
                Agregar CLiente
            </RouterLink>
        </div>
        <Heading>{{titulo}}</Heading>
        <div v-if="existenClientes" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <Cliente 
                                v-for="cliente in clientes"
                                :key="cliente.id"
                                :cliente="cliente"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <p 
            v-else
            class="text-center mt-10"
        >No hay clientes</p>
    </div>
</template>