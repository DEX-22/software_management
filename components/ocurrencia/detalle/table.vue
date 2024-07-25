<template>
    <div class="overflow-x-auto bg-slate-800 rounded-xl">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>N°</th>
        <th>Accion</th>
        <th>Fecha</th>
        <th>Usuario</th>
        <th>Observacion</th>
      </tr>
    </thead>
    <tbody>
        
      <tr v-for="(item,index) in items">
        <th>{{ index+1 }}</th>
        <th>
            {{ item.accion }}
        </th>
        <th>
            {{ (new Date(item.created_at)).toLocaleString() }}
        </th>
        <th>
            {{ item.user }}
        </th>
        <th>
            {{ item.observacion }}
        </th>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script setup>
const props = defineProps({
    items: {
        type:Array,
        default: []
    }
})

</script>