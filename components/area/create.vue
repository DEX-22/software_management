<script setup>

import AreasService from '@/services/areas'
const modalCreateArea = ref(null)
const emit = defineEmits(['closeMe'])
const area = ref('')


onMounted(()=>{
    modalCreateArea.value.showModal()
 
})

async function save(){
    try{
        const res =await AreasService.create({nombre: area.value })
        console.log(res)
        closeModal()
    }catch(e){
        throw new Error(e)
    }
}

function closeModal(){
    modalCreateArea.value.close()
    emit('closeMe')
}

</script>
<template>
    <!-- You can open the modal using ID.showModal() method -->
<dialog ref="modalCreateArea" class="modal">
  <div class="modal-box w-11/12 max-w-lg">
    <section>
        <div class="flex flex-row justify-center">
            <h2 class="text-2xl p-4">
                Registrar area
            </h2>
        </div>
        <div class="form">
            <label class="">
                <div class="">
                    <span class="">Nombre de area</span>
                </div>
                <input v-model="area" type="text" placeholder="Type here" class="" />
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

<style lang="scss" scoped>

.form{
    @apply grid grid-cols-1 place-items-center p-4 ;
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