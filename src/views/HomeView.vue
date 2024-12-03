<template>
  <main>
    <div class="grid justify-items-center">
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          @click="onLogot"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Logout
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const onLogot = () => {
  authStore.logout();
};
</script>
