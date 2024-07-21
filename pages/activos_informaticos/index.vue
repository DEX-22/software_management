<template>
    <NuxtLayout name="modules" title="ACTIVOS INFORMATICOS">

        <template #header>
            <button class="btn" @click="toggleModal">
                Nuevo
            </button>
        </template>
        <template #main>
            <ActivoTable :items="activosInformaticos" :labels="labels" />
            <section v-if="false" class="h-full  grid grid-cols-3 grid-rows-2 gap-4" >
                <div  v-for="item in productList" class="grid grid-cols-3 grid-rows-1 card card-side bg-base-100 shadow-xl">
                    <figure class=" col-span-1 p-4"><img class="h-full"  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                            alt="Movie" /></figure>
                    <div class=" col-span-2 card-body">
                        <h2 class="card-title text-lg truncate h-24">{{ item?.title }}</h2>
                        <p class="overflow-y-scroll">{{ item?.description }}</p>
                        <div class="flex justify-between">
                            <div class="card-actions justify-end ">
                            <div class="badge badge-outline">{{ item?.category }}</div>
                        </div>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Watch</button>
                        </div>
                        </div>
                    </div>
                </div> 
            </section>

        </template>
    </NuxtLayout>
    <ActivoCreate v-if="showModal" @closeMe="toggleModal" />
</template>
<script setup>
import { reactive } from 'vue'
import ActivosInformaticosService from '@/services/activos_informaticos'
const activosInformaticos = reactive([])
const labels = reactive([])

await getActivosInfomaticos()
 
async function getActivosInfomaticos() {

    const data = await ActivosInformaticosService.getAll()
    

    
    data.forEach((element,index) => {
        
        delete element.created_at

        if(index == 0)
            Object.assign(labels,Object.keys(data[0]))

        activosInformaticos.push(element)

    });


}

const showModal = ref(false)

function toggleModal() {
    showModal.value = !showModal.value
}
</script>
