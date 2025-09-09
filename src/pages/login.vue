<template>
  <div class="col-span-full row-start-3 grid place-items-center p-4 sm:p-6 lg:p-8">
    <div class="w-full max-w-sm sm:max-w-md">
      <div class="flex flex-col items-stretch gap-3 sm:gap-4">
        <input class="border-2 rounded px-3 py-2 sm:py-3" v-model="email" type="email" placeholder="Email" />
        <input class="border-2 rounded px-3 py-2 sm:py-3" v-model="password" type="password" placeholder="Password" />
        <button class="border-2 bg-black text-white w-full py-2 sm:py-3 rounded" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from '@/store/useAuthStore'
const userStore = useUserStore()

const email = ref()
const password = ref()
let loggedin = false
const router = useRouter()

async function login(){
  loggedin = await userStore.logUserIn(email.value,password.value)
  if(loggedin){
    console.log("logged in")
    await router.push("/home")
  } else {
    alert("Login failed")
  }
}

</script>

<style scoped>

</style>