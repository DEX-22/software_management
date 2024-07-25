<script setup>
import VSelect from 'vue-select'
import personal from '@/services/personal/index.js';
import ocurrencias from '@/services/ocurrencias/index.ts';
import AreasService from '@/services/areas' 

const modalUpdateStatus = ref(null)
const area = ref(null)
const personalList = reactive([])
const areasList = reactive([])
const status = {
    "EN PROGRESO" : "EN PROGRESO",
    DERIVADO : "DERIVADO",
    CERRADO : "CERRADO"

}




const radioValue = ref("")
const observacion = ref("")

const emit = defineEmits(['closeMe', 'update'])
const props = defineProps({
    ocurrencia: {
        type: Object,
        required: true
    }
})


const areas = await AreasService.getAll()
const list = await personal.getAll()



 
async function save() {
    const id = props.ocurrencia.id
    const info = {
        observacion: observacion.value,
        estado: radioValue.value,
        tecnico_id: props.ocurrencia.tecnico_id.id
    } 
    const res = await ocurrencias.addStep(info,id)
    return
 
    emit('update', row)
    closeModal()
}
 

onBeforeMount(async () => {
    if (areas.length > 0) {
        areas.forEach(({ id, nombre }) => areasList.push({ id, nombre }))
    }
    if (list.length > 0) {
        list.forEach(({ nombres, apellidos, ...i }) => personalList.push({ nombres: `${nombres} ${apellidos}`, ...i }))
    }
})

onMounted(() => {
    
    modalUpdateStatus.value.showModal()
})

function closeModal() {
    modalUpdateStatus.value.close()
    emit('closeMe')
}

</script>
<template>
    <!-- You can open the modal using ID.showModal() method -->
    <dialog ref="modalUpdateStatus" class="modal">
        <div class="modal-box w-11/12 max-w-xl">
            <section>
                <div class="flex flex-row justify-center">
                    <h2 class="text-2xl p-4">
                        Agregar paso
                    </h2>
                </div>

                <div class="form">
                    <div class="form-control w-full flex flex-nowrap flex-row justify-evenly  mx-2">
                        <div class="grid grid-rows-2 place-items-center">
                            <span class="label-text">En progreso</span>
                            <input 
                            type="radio" 
                            name="radio-1" 
                            class="radio" 
                            value="EN PROGRESO" 
                            v-model="radioValue" 
                            />
                        </div>
                        <div class="grid grid-rows-2 place-items-center">
                            <span class="label-text">Derivar</span>
                            <input type="radio" name="radio-1" class="radio" value="DERIVADO" v-model="radioValue"/>
                        </div>
                        <div class="grid grid-rows-2 place-items-center">
                            <span class="label-text">Cerrar</span>
                            <input type="radio" name="radio-1" class="radio" value="CERRADO" v-model="radioValue" />
                        </div>
                    </div>
                    <div class="form-control w-full max-w-xs mx-2"
                    v-if=" radioValue == 'DERIVADO'"
                    >
                        <div class="label">
                            <span class="label-text">Area</span>
                        </div>
                        <VSelect v-model="area" :options="areasList" :reduce="el => el.id" label="nombre" />
                    </div>
                    <div class="form-control w-full max-w-xs mx-2">
                        <div class="label">
                            <span class="label-text">Observacion</span>
                        </div>
                        <textarea 
                        v-model="observacion"
                        class="textarea textarea-bordered" rows="3"></textarea>
                    </div>
                </div>
            </section>
            <div class="modal-action flex justify-center gap-4">

                <!-- if there is a button, it will close the modal -->
                <button class="btn btn-secondary" @click="closeModal">Close</button>
                <button class="btn btn-accent" @click="save">Registrar </button>

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
    --vs-selected-color: oklch(var(--nc));
    ;

    --vs-search-input-color: oklch(var(--b1));
    ;

    --vs-dropdown-option--active-bg: oklch(var(--pc));

}
</style>
<style lang="scss" scoped>
.form {
    @apply grid place-items-center p-4;
}

label {
    @apply form-control w-full max-w-xs mx-2;

    div {
        @apply label;

        span {
            @apply label-text;
        }
    }

    input {
        @apply input input-bordered w-full max-w-xs;
    }
}
</style>