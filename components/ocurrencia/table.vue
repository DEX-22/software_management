<template>
    <div class="overflow-x-auto rounded-xl bg-slate-800">
                <table class="table">
                    <colgroup>
                        <col>
                        <col>
                        <col class="max-w-92">
                        <col>
                        <col>
                        <col>
                    </colgroup>
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>  N° </th> 
                            <th >FECHA</th> 
                            <th >DESCRIPCION</th> 
                            <th >PRIORIDAD</th> 
                            <th >ESTADO</th> 
                            <th >Encargado</th>
                            <th ></th>  
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr 
                        v-for="(row,index) in items"
                        class="hover ">
                             <td class="text-center">
                                {{ index+1 }}
                             </td>
                             <td class="text-nowrap text-center">
                                {{(new Date(row.fecha).toLocaleDateString())}}
                             </td>
                             <td class="">
                                <span class="pl-4 block w-96 max-h-10 truncate">
                                    {{ row.descripcion }}
                                </span>
                             </td>
                             <td>
                                <span class="block flex justify-center w-full" >
                                    <StarIcon :class="{
                                        'text-red-800':row.prioridad == 'ALTA',
                                        'text-orange-600':row.prioridad == 'MEDIA',
                                        'text-green-600':row.prioridad == 'BAJA',
                                    
                                    }"/> 
                                </span>
                             </td>
                             <td>
                                <span class="block text-center w-full">
                                    {{ row.estado }}
                                </span>
                             </td>
                             <td>
                                <span class="block flex justify-center w-full">
                                     <button 
                                     v-if="!row.tecnico_id"
                                        @click="toggleModalAssign(row)"
                                     class="btn border-transparent bg-transparent"  
                                     :disabled="row.tecnico_id">
                                        <UserIcon />
                                     </button>
                                     <span v-else>
                                        {{ row.tecnico_id.nombres }} {{row.tecnico_id.apellidos}}
                                     </span>
                                </span>
                             </td>
                             <td>
                                <span class="block text-center w-full" @click="$router.push(`/ocurrencias/detalle/${row.id}`)">
                                    <span class="text-nowrap text-accent hover:underline hover:font-bold ">ver detalles</span>
                                </span>
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <OcurrenciaAsignarUser v-if="showModalAssign" :ocurrencia="currentRow" @closeMe="toggleModalAssign" @update="updateRow" />
</template>
<script setup>
    const props =  defineProps({
        items: {
            type: Array,
            default: []
        },
        labels:{
            type: Array,
            default: []
        }
    })

    const showModalAssign = ref(false)
    const currentRow = ref({})

    function updateRow(row){
        const rowSelected = props.items.find(item=>item.id == row.id)
        rowSelected.tecnico_id = row.tecnico_id
        rowSelected.estado = row.estado

    }

    function toggleModalAssign(row){
        showModalAssign.value = !showModalAssign.value 

        Object.assign(currentRow.value,row)
        

    }
</script>
<style lang="scss" scoped>
p{

}
td{
    @apply cursor-pointer ;
}
th{
    @apply text-center;
}
</style>