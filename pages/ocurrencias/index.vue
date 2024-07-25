<template>
    <section>
        <div class="flex flex-row-reverse">
            <div class="p-4">
                <!-- <button @click="$router.push('ocurrencias/create')" class="btn btn-neutral">
                    Registrar ocurrencia
                </button> -->

                <button class="btn" @click="toggleModal">
                    <PlusIcon />
                    Nueva incidencia</button>
            </div>
        </div>
        <div class=" " >
            <OcurrenciaTable :items="ocurrenciaList" :labels="ocurrenciaLabels"  />

        </div>
    </section>
    <OcurrenciaCreate v-if="showModal" @closeMe="toggleModal" @add="addInTable" />
</template>
<script setup>
import OcurrenciasService from '@/services/ocurrencias';

const showModal = ref(false)
const ocurrenciaList = reactive([])
const ocurrenciaLabels = reactive([])
const typeModal = ref("new")

await fetchData() 

async function fetchData(){
    const ocurrencia = await OcurrenciasService.getAll()
    
    if(ocurrencia.length > 0 && ocurrenciaList.length == 0){ 
    
        ocurrencia.forEach((e,i)=>{
            delete e.created_at
            delete e.created_by
            delete e.titulo 
            delete e.update_id
            
            if(i == 0){
                ocurrenciaLabels.push(...Object.keys(e))
            }
            ocurrenciaList.push(e)
        })
}else{
    ocurrencia.forEach(el=>{
            if(!ocurrenciaList.some(o=>o.id == el.id)){
                    delete el.created_at
                    delete el.created_by
                    delete el.titulo 
                    delete el.update_id

                    ocurrenciaList.push(el)
                }
        })

    
}



}

function toggleModal() {
    showModal.value = !showModal.value
}

</script>