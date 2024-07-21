<script setup>
const props = defineProps({
    labels:{
        type: Array,
        required: true,
        default: []
    },
    items: {
        type: Array,
        required: true,
        default: []
    }
})

const ownLabels = reactive([...props.labels,'editar'])
const ownItems = reactive([...props.items.map(e=>({...e,editar:false}))])

</script>

<template>
    <div class="overflow-x-auto bg-slate-700">
  <table class="table table-xl">
    <thead>
      <tr >
        <th v-for="title in ownLabels">{{ title }}</th> 
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in ownItems">
        <td v-for="col in Object.keys(row)">{{row[col]}}</td> 
      </tr>
      
    </tbody> 
  </table>
</div>
</template>
