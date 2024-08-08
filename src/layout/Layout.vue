<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, watch } from 'vue';
import Topbar from './Topbar.vue';
import Sidebar from './Sidebar.vue';
import { RouterView } from 'vue-router';
import Footer from './Footer.vue';
import Toast from 'primevue/toast';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    };
});
</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <Topbar />
        <Sidebar />
        <div class="layout-main-container">
            <div class="layout-main">
                <!-- RouterView will render any page based on routes that set on router/index.js -->
                <RouterView />
            </div>
            <Footer />
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>
