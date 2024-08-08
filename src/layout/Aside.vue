<script setup>
import { ref } from 'vue';
import AsideItem from './AsideItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Homepage', icon: 'pi pi-fw pi-home', to: '/homepage' }]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <!-- Sending prop item into AsideItem -->
            <AsideItem :item="item" :index="i" />
            <li class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
