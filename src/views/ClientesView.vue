<script setup>
    // import {RouterLink} from "vue-router"
    import RouterLink from "../components/UI/RouterLink.vue"
    import Heading from "../components/UI/Heading.vue"

    defineProps({
        titulo: {
            type: String,
        }
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
    </div>
</template>