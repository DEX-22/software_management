<template>
    <NuxtLayout name="modules" title="AREAS">

        <template #header>
            <button class="btn" @click="toggleModal">
                Nuevo
            </button>
        </template>
        <template #main> 
           <section class="flex flex-row justify-center">
            
            <AreaTable :items="areasList" :labels="areasLabels" />
           </section>
        </template>
    </NuxtLayout> 
    <AreaCreate v-if="showModalArea"  />
</template>
<script setup>
import AreasService from '@/services/areas'
const showModalArea = ref(false)
const areasList = reactive([])
const areasLabels = reactive([])
onBeforeMount(async ()=>{
    const areas = await AreasService.getAll()

    if(areas.length > 0){ 
        areas.forEach((e,i)=>{
            delete e.created_at


            if(i == 0){
                areasLabels.push(...Object.keys(e))
            }
            areasList.push(e)
        })
    }
})
function toggleModal(){
    showModalArea.value = !showModalArea.value
}
</script>