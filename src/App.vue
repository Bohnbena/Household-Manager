<script setup>
import { useUserStore } from '@/store/useAuthStore'
import router from "@/router/index.js";
import {computed} from "vue";
const userStore = useUserStore()

async function logout(){
  await userStore.logUserOut()
  await router.push("/")
}
const isAuthenticated = computed(() => userStore.isAuthenticated)
</script>

<template>
  <div class="w-full min-h-screen grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 auto-rows-[80px] sm:auto-rows-[100px] lg:auto-rows-[120px] gap-2 sm:gap-3 lg:gap-4">
    <div v-show="isAuthenticated">
      <button @click="logout()" class="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black text-white p-2 sm:p-3 rounded">Logout</button>
    </div>
    <router-view/>
  </div>
</template>

<style scoped>

</style>
