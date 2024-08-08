<script setup>
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { onMounted, ref } from 'vue';
const users = ref([])

const columns = [
  { field: 'avatar', header: 'Avatar' },
  { field: 'email', header: 'Email' },
  { field: 'first_name', header: 'First Name' },
  { field: 'last_name', header: 'Last Name' },
];

const getUsers = async () => {
  try {
    const response = await fetch('https://reqres.in/api/users?page=2')
    const data = await response.json()
    users.value = data.data
  }
  catch (e) {
    console.error(e.message)
  }
}
onMounted(() => {
  getUsers()
})
</script>

<template>
  <div>
    <DataTable :value="users" :paginator="true" :rows="10" dataKey="id" :rowHover="true" showGridlines>
      <template #empty> No customers found. </template>
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
        <!-- Slotprops refers to users -->
        <template #body="slotProps">
          <img v-if="col.field === 'avatar'" :src="slotProps.data[col.field]" alt="Avatar"
            style="width: 50px; height: 50px; border-radius: 50%;" />
          <span v-else>{{ slotProps.data[col.field] }}</span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>