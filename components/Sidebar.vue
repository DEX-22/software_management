<template>
    <div class=" flex flex-col h-full justify-center  bg-base-200  ">
        <div v-for="item in items" class="rounded-xl  shadow-xl m-2 w-72 h-20 btn-primary btn ">
            <div class=" flex flex-row justify-center align-center">
                <NuxtLink class="card-title" :to="item.link">{{ item.text }}</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const items = reactive([{
    icon:"BellIcon",
    text:"Incidencias",
    link: "/ocurrencias",
},{
    icon:"UserIcon",
    text:"Usuarios",
    link: "/usuarios",
},{
    icon:"ToolIcon",
    text:"Activos informaticos",
    link: "/activos_informaticos",
},{
    icon:"UsersIcon",
    text:"Areas",
    link: "/areas",
}
])

</script>

