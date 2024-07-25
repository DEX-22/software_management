<template>
<main>
    <section class="border-2 border-slate-500 px-4 py-8 rounded-xl bg-slate-500 shadow-xl"> 
        <div class="flex flex-row justify-center">
            <h2 class="text-2xl p-4">
                INCIDENCIA {{  }}
            </h2>
        </div>
        <div class="grid grid-cols-4 gap-2 ">
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label">
                    <span class="label-text">Activo informatico</span>
                </div>
               <span class="px-2">
                {{ ocurrencia.activo }}
               </span>
            </div> 

            
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label">
                    <span class="label-text">Area</span>
                </div>
                <span class="px-2">
                    {{ocurrencia.area}}
                </span>
                
            </div> 
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label"> 
                    <span> Fecha de incidente </span>
                </div>
                <span class="px-2">
                    {{ ocurrencia.fecha }}
                </span>
            </div> 
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label"> 
                    <span> Tipo de mantenimiento </span>
                </div>
                <span class="px-2">
                    {{ ocurrencia.tipo_mantenimiento }}
                </span>

                      
            </div> 
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label"> 
                    <span> Prioridad </span>
                </div>
                <span class="px-2">
                    {{ ocurrencia.prioridad }}
                </span> 
            </div>
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label">
                    <span class="label-text">Solicitante</span>
                </div>
                <span class="px-2">
                    {{ ocurrencia.personal }}
                </span>
            </div>  
            <div class=" w-full col-start-3 col-end-5  form-control ">
                <div class="  label  ">  
                    <span> Descripcion del incidente </span>
                </div>
                <textarea 
                v-model="ocurrencia.descripcion"
                class="px-2 w-full bg-transparent"
                disabled></textarea>
            </div>
        </div>
        
    </section>
    <div>
        <div class="w-full py-2 px-4 flex mt-4 mb-8 justify-between">
            <h2 class="text-2xl ">
                SEGUIMIENTO
            </h2>
            <div>
                <button class="btn"
                    @click="toggleModalUpdateStatus"
                >
                    <PlusIcon />
                    Actualizar estado
                </button>
            </div>
        </div>
        <OcurrenciaDetalleTable :items="trackingData" />
    </div>
</main>
<OcurrenciaDetalleActualizarEstado 
    v-if="showModalUpdateStatus" 
    :ocurrencia="ocurrencia"
    @closeMe="toggleModalUpdateStatus" />  
</template>
<script setup>
import OcurrenciasService from '@/services/ocurrencias/index.ts';
import OcurrenciasTrackingService from '@/services/ocurrencias/tracking.ts'

const route = useRoute()
const ocurrencia = reactive({
    activo_id: null,
    area_id: null,
    personal_id: null,
    fecha:'',
    tipo_mantenimiento: '',
    prioridad: '',
    descripcion:''
})
const showModalUpdateStatus = ref(false)

const data = await OcurrenciasService.getDetailsById(route.params.id)
const trackingData = await OcurrenciasTrackingService.getTrackingOcurrencia(route.params.id)
Object.assign(ocurrencia,data)

 console.log(ocurrencia)

onMounted(()=>{
    
 
})

async function save(){

    ocurrencia.estado = "PENDIENTE"
    const res = await OcurrenciasService.create(ocurrencia)
    // console.log(res)

    closeModal()
    emit('add')
}

function toggleModalUpdateStatus(){
    showModalUpdateStatus.value = !showModalUpdateStatus.value
}

function getTodayToInput(){
    const today = new Date()
    const month = today.getMonth()+1
    return `${today.getFullYear()}-${month > 9?'':'0'}${month}-${today.getDate()}`
}
 

</script>


<style scoped>
>>> {
    
  --vs-controls-color: oklch(var(--nc));
  --vs-border-color: oklch(var(--nc));

  --vs-dropdown-bg: oklch(var(--b1));
  --vs-dropdown-color: oklch(var(--n));
  --vs-dropdown-option-color: oklch(var(--p));

  --vs-selected-bg: oklch(var(--s));
  --vs-selected-color: oklch(var(--nc));;

  --vs-search-input-color: oklch(var(--b1));;

  --vs-dropdown-option--active-bg: oklch(var(--pc));
  
}


</style>

<style lang="scss" scoped>
.label{
    span{
        @apply text-slate-800 font-bold text-lg ;
    }
}

</style>