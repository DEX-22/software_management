<script setup>
import VSelect from 'vue-select'
import ActivosInformaticosService from '@/services/activos_informaticos';
import AreasService from '@/services/areas'
import OcurrenciasService from '@/services/ocurrencias';
import PersonalService from '@/services/personal'

const modalCreateBug = ref(null)
const emit = defineEmits(['closeMe'])
const activosList = reactive([])
const areasList = reactive([])
const personalList = reactive([])
const fecha = getTodayToInput()


const ocurrencia = reactive({
    activo_id: null,
    area_id: null,
    personal_id: null,
    fecha,
    tipo_mantenimiento: '',
    prioridad: null,
    descripcion:''
})

onBeforeMount(async ()=>{
    const activos = await ActivosInformaticosService.getAll()
    const areas = await AreasService.getAll()
    const personal = await PersonalService.getAll()

    if(activos.length > 0){
        activos.forEach(({id,nombre})=>activosList.push({id,nombre}))
    }
    if(areas.length > 0){
        areas.forEach(({id,nombre})=>areasList.push({id,nombre}))
    }
    if(personal.length > 0){
        personal.forEach(({id,nombres,apellidos})=>personalList.push({id,nombre: `${nombres} ${apellidos}`}))
    }
})

onMounted(()=>{
    modalCreateBug.value.showModal()

    // console.dir(modalCreateBug.value)
})

async function save(){
    ocurrencia.estado = "PENDIENTE"
    const res = await OcurrenciasService.create(ocurrencia)
    console.log(res)

    closeModal()
}

function getTodayToInput(){
    const today = new Date()
    const month = today.getMonth()+1
    return `${today.getFullYear()}-${month > 9?'':'0'}${month}-${today.getDate()}`
}

function closeModal(){
    modalCreateBug.value.close()
    emit('closeMe')
}

</script>
<template>
    <!-- You can open the modal using ID.showModal() method -->
<dialog ref="modalCreateBug" class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    <section>
        <div class="flex flex-row justify-center">
            <h2 class="text-2xl p-4">
                Crear incidencia
            </h2>
        </div>
        <div class="form">
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label">
                    <span class="label-text">Activo informatico</span>
                </div>
                <VSelect
                v-model="ocurrencia.activo_id"
                :options="activosList"
                :reduce="el=>el.id"
                label="nombre"
                /> 
            </div> 
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label">
                    <span class="label-text">Area</span>
                </div>
                <VSelect
                v-model="ocurrencia.area_id"
                :options="areasList"
                :reduce="el=>el.id"
                label="nombre"
                /> 
            </div> 
            <label>
                <div> 
                    <span> Fecha de incidente </span>
                </div>
                <input v-model="ocurrencia.fecha" type="date">
            </label> 
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label"> 
                    <span> Tipo de mantenimiento </span>
                </div>
                <VSelect 
                    v-model="ocurrencia.tipo_mantenimiento"
                    :options="['ADAPTATIVO','CORRECTIVO','PREVENTIVO','PERFECTIVO']"
                    
                    
                    /> 
            </div> 
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label"> 
                    <span> Prioridad </span>
                </div>
                <VSelect 
                    v-model="ocurrencia.prioridad"
                    :options="['BAJA','MEDIA','ALTA']" 
                    
                    /> 
            </div>
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label">
                    <span class="label-text">Personal responsable</span>
                </div>
                <VSelect
                v-model="ocurrencia.personal_id"
                :options="personalList"
                :reduce="el=>el.id"
                label="nombre"
                /> 
            </div>  
            <label class="   ">
                <div class="    ">  
                    <span> Descripcion del incidente </span>
                </div>
                <textarea 
                v-model="ocurrencia.descripcion"
                class="textarea textarea-bordered w-full"></textarea>
            </label>
        </div>
    </section>
    <div class="modal-action flex justify-center gap-4">
       
        <!-- if there is a button, it will close the modal -->
        <button class="btn btn-secondary" @click="closeModal" >Close</button>
        <button class="btn btn-accent" @click="save" >Registrar</button>
      
    </div>
  </div>
</dialog>

</template>
<style scoped>
>>> {
  --vs-controls-color: oklch(var(--n));
  --vs-border-color: oklch(var(--n));

  --vs-dropdown-bg: oklch(var(--b1));
  --vs-dropdown-color: oklch(var(--n));
  --vs-dropdown-option-color: oklch(var(--p));

  --vs-selected-bg: oklch(var(--s));
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: oklch(var(--pc));
  
}
</style>
<style lang="scss" scoped>

.form{
    @apply grid grid-cols-3 place-items-center p-4 gap-2 ;
}

label{
    @apply form-control w-full max-w-xs mx-2 ;
    div{
        @apply label ;
        span{
            @apply label-text ;
        }
    }
    input,select{
        @apply input input-bordered w-full max-w-xs h-8 ;
    }
}

</style>