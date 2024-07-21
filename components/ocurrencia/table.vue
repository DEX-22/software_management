<template>
    <div class="overflow-x-auto rounded-xl bg-slate-800">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th v-for="label in labels">{{label}}</th> 
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr 
                        v-for="row in items"
                        class="hover pointer">
                            <th v-for="col in Object.keys(row)">
                                {{ row[col] != null && typeof row[col] == 'object'? row[col].nombre?row[col].nombre : `${row[col].nombres} ${row[col].apellidos}` : row[col] }} 
                                </th> 
                        </tr>
                    </tbody>
                </table>
            </div>
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

</script>