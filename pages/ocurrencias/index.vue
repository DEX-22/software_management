<template>
    <section>
        <div class="flex flex-row-reverse">
            <div class="p-4">
                <!-- <button @click="$router.push('ocurrencias/create')" class="btn btn-neutral">
                    Registrar ocurrencia
                </button> -->

                <button class="btn" @click="toggleModal">Nueva incidencia</button>
            </div>
        </div>
        <div class=" " >
            <OcurrenciaTable :items="ocurrenciaList" :labels="ocurrenciaLabels"  />

        </div>
    </section>
    <OcurrenciaCreate v-if="showModal" @closeMe="toggleModal" />
</template>
<script setup>
import OcurrenciasService from '@/services/ocurrencias';

const showModal = ref(false)
const ocurrenciaList = reactive([])
const ocurrenciaLabels = reactive([])

onBeforeMount(async ()=>{
    const ocurrencia = await OcurrenciasService.getAll()

    if(ocurrencia.length > 0){ 
        ocurrencia.forEach((e,i)=>{
            delete e.created_at
            delete e.created_by
            delete e.titulo
            delete e.tecnico_id
            delete e.update_id
            
            if(i == 0){
                ocurrenciaLabels.push(...Object.keys(e))
            }
            ocurrenciaList.push(e)
        })
    }
})

function toggleModal() {
    showModal.value = !showModal.value
}

</script>