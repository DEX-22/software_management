<template>
    <section class="p-10   grid grid-rows-12 h-full  " >
        <div class="h-full flex flex-row ">
            <h1 class=" row-span-1 text-3xl font-bold   "> {{ props.title }}</h1>
        </div>
        <section class="row-span-11 grid grid-rows-12 ">
            <div class=" row-span-1 flex flex-row-reverse ">
                <slot name="header"  />
            </div>  
            <div class="  row-span-11 p-4  overflow-y-scroll">
                <slot name="main" />
 
            </div>

        </section>
    </section>
</template>
<script setup>

const props = defineProps({
    title: {type:String}
})

</script>