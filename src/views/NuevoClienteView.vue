<script setup>

    import {reactive} from "vue"
    import {FormKit} from "@formkit/vue"
    import {useRouter} from "vue-router" // hook de "vue-router" (v206)
    
    // import axios from "axios"
    // import axios from "../lib/axios" // v209
    import ClienteService from "../services/clienteService" // v210
    
    import RouterLink from "../components/UI/RouterLink.vue"
    import Heading from "../components/UI/Heading.vue"

    const router = useRouter()

    defineProps({
        titulo: {
            type: String,
        }
    })

    const formData = reactive({})

    const handleSubmit = (data) => {
        data.estado = 1
        ClienteService.agregarCLiente(data)
            .then((respuesta) => {
                router.push({name: 'listado-clientes'}) // redirecciono al usuario luego de creado el cliente con el hook useRouter de "vue-router" (v206)
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
                submit-label="Agregar Cliente"
                incomplete-message="No se pudo enviar, revisa los mensajes"
                @submit="handleSubmit"
                :value="formData"
            >
            <!-- con el prop :actions="false" eliminamos el <button type="submit"> que genera por default FormKit -->
            <!-- con el prop submit-label="..." customizamos el nombre del <button type="submit"> el form que genera FormKit por default -->
            <!-- con el prop incomplete-message="..." customizamos el mensaje de error que se renderiza con el submit del form si existió error de validación en alguno de los campos -->
            <!-- con :value="formData" mapeamos el value de los distintos elementos del form con la data del objeto formData creado por nosotros (calculo que esto es util para autocompletar un formulario de edicion de lo que sea) (v199) -->
                
            <FormKit 
                    type="text"
                    label="Nombre"
                    name="nombre"
                    placeholder="Nombre de Cliente"
                    validation="required"
                    :validation-messages="{required: 'El nombre del cliente es obligatorio'}"
                />
                <!-- help="Coloca el Nombre del Cliente que deseas registrar" -->
                <!-- validation-visibility="blur" -->
                <!-- validation-visibility="live" -->
                <!-- validation-visibility="submit" -->
                <!-- prefix-icon="add" -->

                <FormKit 
                    type="text"
                    label="Apellido"
                    name="apellido"
                    placeholder="Apellido de Cliente"
                    validation="required"
                    :validation-messages="{required: 'El apellido del cliente es obligatorio'}"
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
                />
                
                <!-- en este caso, al ser opcional la carga del teléfono, no le aplicamos al input la regla required -->
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
                />
                <!-- "*", "+" y "?" se conocen como rules hidden -->
                <!-- validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/" -->
                <!-- validation="+matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/" -->
                <!-- validation="?matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/" -->

                <FormKit 
                    type="text"
                    label="Empresa (opcional)"
                    name="empresa"
                    placeholder="Empresa de Cliente"
                />

                <FormKit 
                    type="text"
                    label="Puesto (opcional)"
                    name="puesto"
                    placeholder="Puesto de Cliente"
                />
                
                <!-- 
                <FormKit 
                    type="submit"
                    label="Agregar Cliente"
                /> 
                -->
            </FormKit>
        </div>
    </div>
</template>
<style>
    .formkit-wrapper {
        max-width: 100%;
    }
</style>