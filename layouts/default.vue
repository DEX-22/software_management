<template>
    <section class="grid grid-cols-6 grid-rows-12 bg-slate-200 h-screen w-screen  ">
        <div class=" col-span-1 row-span-12  ">
            <Sidebar />
        </div>
        <div class=" col-span-5 row-span-1 ">
            <Navbar />
        </div>
        <div class=" col-span-5 row-span-11 overflow-visible bg-slate-600 p-10">
            <section class="h-full   ">
                <slot />
            </section>
        </div>
       
    </section>
</template>