<script setup>
const modalCreateBug = ref(null)
const emit = defineEmits(['closeMe'])

onMounted(()=>{
    modalCreateBug.value.showModal()

    // console.dir(modalCreateBug.value)
})

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
            <label class="">
                <div class="">
                    <span class="">Nombre de activo</span>
                </div>
                <input type="text" placeholder="Type here" class="" />
            </label> 
            <label>
                <div> 
                    <span> Version </span>
                </div>
                <input type="text">
            </label>
            <label>
                <div> 
                    <span> Fecha de incidente </span>
                </div>
                <input type="date">
            </label>
            <label>
                <div> 
                    <span> Descripcion del incidente </span>
                </div>
                <input type="text">
            </label>
            <label>
                <div> 
                    <span> Tipo de mantenimiento </span>
                </div>
                <input type="text">
            </label>
            <label>
                <div> 
                    <span> Prioridad </span>
                </div>
                <input type="text">
            </label>
            <label>
                <div> 
                    <span> Personal responsable </span>
                </div>
                <input type="text">
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