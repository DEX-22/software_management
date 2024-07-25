<script setup>
import VSelect from 'vue-select'
import personal from '@/services/personal/index.js';
import ocurrencias from '@/services/ocurrencias/index.ts';

const modalAssignUser = ref(null)
const user = ref(null)
const personalList = reactive([])
const emit = defineEmits(['closeMe','update'])
const props = defineProps({
    ocurrencia:{
        type: Object,
        required: true
    }
})

async function save(){
    
    const data = await ocurrencias.assignTech(props.ocurrencia.id,user.value.id)
    const row = data[0]
    row.tecnico_id = user.value

    emit('update',row)
    closeModal()
}

const list = await personal.getAll()
onBeforeMount(async ()=>{
    if(list.length > 0){
        list.forEach(({nombres,apellidos,...i})=>personalList.push({nombres: `${nombres} ${apellidos}`,...i}))
    }
})

onMounted(()=>{
    modalAssignUser.value.showModal()
})

function closeModal(){
    modalAssignUser.value.close()
    emit('closeMe')
}

</script>
<template>
    <!-- You can open the modal using ID.showModal() method -->
<dialog ref="modalAssignUser" class="modal">
  <div class="modal-box w-11/12 max-w-xl">
    <section>
        <div class="flex flex-row justify-center">
            <h2 class="text-2xl p-4">
                Asignar encargado
            </h2>
        </div>
        <p>
            <strong class="text-lg">Descripcion: </strong>
            {{ ocurrencia.descripcion }}
        </p>
        
        <div class="mx-1 my-4 px-2 flex justify-between">
            <div class="badge badge-neutral" >
                {{ocurrencia.estado   }}
            </div>
            <div>
                {{ ocurrencia.fecha }}
            </div>
        </div>
        <div class="form">
            <div class="form-control w-full max-w-xs mx-2">
                <div class="label">
                    <span class="label-text">Tecnico</span>
                </div>
                <VSelect
                v-model="user"
                :options="personalList" 
                label="nombres"
                /> 
            </div>  
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

.form{
    @apply grid   place-items-center p-4 ;
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