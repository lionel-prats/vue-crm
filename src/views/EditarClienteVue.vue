<script setup>
    import {onMounted, reactive} from "vue"

    import {FormKit} from "@formkit/vue"
    import {useRouter, useRoute} from "vue-router"
    import ClienteService from "../services/clienteService"
    import RouterLink from "../components/UI/RouterLink.vue"
    import Heading from "../components/UI/Heading.vue"

    const router = useRouter()
    const route = useRoute()
    
    // id = parametro dinamico recibido por parametro en la URL (http://localhost:5173/editar-cliente/2)
    // el nombre del parametro lo definimos en src\router\index.js 
    // en este caso, en en src\router\index.js, lo definimos como -> path: '/editar-cliente/:id' (ver archivo)
    const{ id } = route.params 

    const formData = reactive({})

    // axios con promises
    onMounted(() => {
        ClienteService.obtenerCLiente(id)
            .then(({data}) => Object.assign(formData, data)) // cargo el state formData con la respuesta de la API (v217)
            .catch(error => console.log(error))  
    })

    defineProps({
        titulo: {
            type: String,
        }
    })

    const handleSubmit = (data) => { // v218
        // data.estado = formData.estado
        ClienteService.actualizarCLiente(id, data)
            .then((/* respuesta */) => {
                router.push({name: 'listado-clientes'})
            })
            .catch(error => console.log(error))  
    }

</script>
<template>
    <div class="flex justify-end">
        <RouterLink to="listado-clientes">
            Volver
        </RouterLink>
    </div>
    <Heading>{{titulo}}</Heading>
    <div class="mx-auto mt-10 bg-white shadow">
        <div class="mx-auto md:w-2/3 py-20 px-6">
            <FormKit
                type="form"
                submit-label="Guardar Cambios"
                incomplete-message="No se pudo enviar, revisa los mensajes"
                @submit="handleSubmit"
            >   
            <!-- :value="formData" -->
                <FormKit 
                    type="text"
                    label="Nombre"
                    name="nombre"
                    placeholder="Nombre de Cliente"
                    validation="required"
                    :validation-messages="{required: 'El nombre del cliente es obligatorio'}"
                    v-model="formData.nombre"
                />
                <FormKit 
                    type="text"
                    label="Apellido"
                    name="apellido"
                    placeholder="Apellido de Cliente"
                    validation="required"
                    :validation-messages="{required: 'El apellido del cliente es obligatorio'}"
                    v-model="formData.apellido"
                />
                <FormKit 
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="cliente@correo.com"
                    validation="required|email"
                    :validation-messages="{
                        required: 'El email del cliente es obligatorio',
                        email: 'Coloca un email válido',
                    }"
                    v-model="formData.email"
                />
                <FormKit 
                    type="text"
                    label="Teléfono (opcional)"
                    name="telefono"
                    help="formato: 123-456-7890" 
                    placeholder="123-456-7890"
                    validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                    :validation-messages="{
                        matches: 'El formato no es válido'
                    }"
                    v-model="formData.telefono"
                />
                <FormKit 
                    type="text"
                    label="Empresa (opcional)"
                    name="empresa"
                    placeholder="Empresa de Cliente"
                    v-model="formData.empresa"
                />
                <FormKit 
                    type="text"
                    label="Puesto (opcional)"
                    name="puesto"
                    placeholder="Puesto de Cliente"
                    v-model="formData.puesto"
                />
                </FormKit>
        </div>
    </div>
</template>
<style>
    .formkit-wrapper {
        max-width: 100%;
    }
</style>