<script setup>
    import {} from "@formkit/vue"

    import RouterLink from "../components/UI/RouterLink.vue"
    import Heading from "../components/UI/Heading.vue"

    defineProps({
        titulo: {
            type: String,
        }
    })

</script>
<template>
    <div class="flex justify-end">
        <RouterLink to="inicio">
            Volver
        </RouterLink>
    </div>
    <Heading>{{titulo}}</Heading>
    <div class="mx-auto mt-10 bg-white shadow">
        <FormKit
            type="form"
        >
        <!-- :actions="false" -->

        </FormKit>
    </div>
</template>