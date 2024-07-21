<script setup>
import ActivoService from '@/services/activos_informaticos/index'

const modalCreateActivo = ref(null)
const emit = defineEmits(['closeMe'])

onMounted(()=>{
    modalCreateActivo.value.showModal() 
})

const activo = ref({
    nombre:'',
    descripcion: '',
    marca: '',
    modelo : '',
})

async function saveItem(){
    // console.log(activo.value)
   const data = await ActivoService.create(activo.value)

   return data
}


function closeModal(){
    modalCreateActivo.value.close()
    emit('closeMe')
}

</script>
<template> 
<dialog ref="modalCreateActivo" class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    <section>
        <div class="flex flex-row justify-center">
            <h2 class="text-2xl p-4">
                Registrar activo informatico
            </h2>
        </div>
        <div class="form">
            <label class="">
                <div class="">
                    <span class="">Nombre</span>
                </div>
                <input v-model="activo.nombre" type="text" class="" />
            </label> 
            <label>
                <div> 
                    <span> Descripcion </span>
                </div>
                <input v-model="activo.descripcion" type="text">
            </label>
            <label>
                <div> 
                    <span> Marca </span>
                </div>
                <input v-model="activo.marca" type="text">
            </label>
            <label>
                <div> 
                    <span> Modelo </span>
                </div>
                <input v-model="activo.modelo" type="text">
            </label>
           
        </div>
    </section>
    <div class="modal-action flex justify-center gap-4">
       
        <!-- if there is a button, it will close the modal -->
        <button class="btn btn-secondary" @click="closeModal" >Close</button>
        <button class="btn btn-accent" @click="saveItem" >Registrar</button>
      
    </div>
  </div>
</dialog>

</template>

<style lang="scss" scoped>

.form{
    @apply grid grid-cols-2 place-items-center p-4 ;
}

label{
    @apply form-control w-full max-w-xs mx-2 ;
    div{
        @apply label ;
        span{
            @apply label-text ;
        }
    }
    input{
        @apply input input-bordered w-full max-w-xs ;
    }
}

</style>