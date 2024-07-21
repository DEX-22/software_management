<template>
    <div class="overflow-x-auto bg-slate-700 rounded-xl max-w-96">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th v-for="label in labels"> {{ label }}</th>
      </tr>
    </thead>
    <tbody> 
      <tr v-for="row in items">
        <th v-for="col in Object.keys(row)"> {{ row[col] }}</th>

      </tr>
      
    </tbody>
  </table>
</div>
</template>
<script setup>
const props = defineProps({
    items:{
        type: Array,
        default: []
    },
    labels: {
        type:Array,
        default: []
    }
})
</script>