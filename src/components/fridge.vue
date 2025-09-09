<script setup lang="ts">
import {fridgeService, fridgeServiceAddItem} from '@/service/fridge'
import {onMounted, ref} from "vue";
import {IFridge} from "@/interfaces/fridge";

// fridge data
const fridgeData = ref<IFridge[] | null>([])
const newFridgeItem = ref<IFridge>({
  id: 0,
  content: '',
  amount: 1,
  priority: 0,
})

// get fridge data on load
async function getFridge() {
  fridgeData.value = await fridgeService.getFridge()
}

async function addItem() {
  await fridgeServiceAddItem.addItem(newFridgeItem.value)
}

onMounted(() => {
  getFridge()
})

</script>

<template>
  <div class="flex flex-col border-1 border-black p-4 gap-4">
    <div v-for="item in fridgeData">
      <div>
        <!-- buttons to increase/decrease amount -->
        <div>
          <button>+</button>
        </div>
        <div>
          <button>-</button>
        </div>
      </div>
      <div>
        <div>{{ item.content }}</div>
        <div>{{ item.amount }}</div>
        <div>{{ item.priority }}</div>
      </div>
    </div>
    <div class="flex flex-col w-52">
      <div class="flex flex-col gap-2">
        <input v-model="newFridgeItem.content" type="text" placeholder="Produkt">
        <input v-model.number="newFridgeItem.amount" type="number" placeholder="Menge">
        <input v-model.number="newFridgeItem.priority" type="number" placeholder="Priorität">
      </div>
      <button @click="addItem">Add Item</button>
    </div>
  </div>
</template>

<style scoped>
 input {
   border: 1px solid black;
 }
</style>