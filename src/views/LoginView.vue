<template>
  <div class="grid justify-items-center">
    <form @submit.prevent="onLogin">
      <div class="space-y-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm/6 font-medium text-gray-900">Ficha</label>
            <div class="mt-2">
              <input
                v-model="myForm.ficha"
                ref="fichaInputRef"
                type="number"
                autocomplete="given-name"
                placeholder="Ficha"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm/6 font-medium text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                v-model="myForm.password"
                ref="passInputRef"
                type="password"
                autocomplete="family-name"
                placeholder="Password"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-3 mt-5">
        <div class="flex h-6 shrink-0 items-center">
          <div class="group grid size-4 grid-cols-1">
            <input
              v-model="myForm.record"
              aria-describedby="candidates-description"
              name="candidates"
              type="checkbox"
              class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
            />
            <CheckIN />
          </div>
        </div>
        <div class="text-sm/6">
          <label for="candidates" class="font-medium text-gray-900">Remember me?</label>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import CheckIN from '@/assets/icons/checkIN.vue';
// import { useRouter } from 'vue-router';

const fichaInputRef = ref<HTMLInputElement>();
const passInputRef = ref<HTMLAnchorElement>();

const authStore = useAuthStore();

const myForm = reactive({
  ficha: 0,
  password: '',
  record: false,
});
const onLogin = async () => {
  if (myForm.ficha === 0) {
    fichaInputRef.value?.focus();
    return;
  }
  if (myForm.password === '') {
    passInputRef.value?.focus();
    return;
  }
  if (myForm.record === true) {
    localStorage.setItem('ficha', myForm.ficha.toString());
  }

  const response = await authStore.onLogin(myForm.ficha, myForm.password);
  console.log(response);
};
</script>
