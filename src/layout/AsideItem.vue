<script setup>
// Importing necessary modules and functions from Vue and other sources
import { useLayout } from '@/layout/composables/layout';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Using the useRoute hook to get the current route
const route = useRoute();

// Using the useLayout hook to get layout state and functions
const { layoutState, onMenuToggle } = useLayout();

// Defining the props that can be passed into this component
const props = defineProps({
    item: {
        type: Object,
        default: () => ({}) // Default value if not provided
    },
    index: {
        type: Number,
        default: 0 // Default value if not provided
    },
    root: {
        type: Boolean,
        default: true // Default value if not provided
    },
    parentItemKey: {
        type: String,
        default: null // Default value if not provided
    }
});
// Creating a ref to hold the state of whether the menu item is active
const isActiveMenu = ref(false);
// Creating a ref to hold the key of the item
const itemKey = ref(null);

// Lifecycle hook that runs before the component is mounted
onBeforeMount(() => {
    // Setting the itemKey based on the parentItemKey and index
    itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index);
    // Getting the currently active item from the layout state
    // ?const activeItem = layoutState.activeMenuItem;

    // Setting isActiveMenu based on whether the current item matches the activeItem or starts with the itemKey.
    //  isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(itemKey.value + '-') : false;
});

// Watching for changes to the activeMenuItem in the layout state
watch(() => layoutState.activeMenuItem,
    (newVal) => {
        // Updating isActiveMenu based on the new activeMenuItem
        isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(itemKey.value + '-');
    }
);

// Function to handle item clicks
const itemClick = (event, item) => {
    if (item.disabled) {
        event.preventDefault();
        return;
    }
    // Toggling the menu if the item has a route or URL and the static or overlay menu is active
    if ((item.to || item.url) && (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive)) {
        onMenuToggle();
    }

    // Since the item has no command object, so i ignore this
    // if (item.command) {
    //     item.command({ originalEvent: event, item: item });
    // }

    // For dropdown menu
    // Determining the key to set as active based on whether the item has children and the current state

};

// Function to check if the current route matches the item's route
const checkActiveRoute = (item) => {
    return route.path === item.to;
};
</script>

<template>
    <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
        <router-link v-if="item.to && !item.items && item.visible !== false" @click="itemClick($event, item, index)"
            :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" :to="item.to">
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
        </router-link>

        <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
            <!-- Sending props to its own component -->
            <!-- Looping the props.item first, then sending children props using that parent prop -->
            <AsideItem v-for="(child, i) in item.items" :key="child" :index="i" :item="child" :parentItemKey="itemKey"
                :root="false"></AsideItem>
        </ul>
    </li>
</template>

<style lang="scss" scoped></style>
