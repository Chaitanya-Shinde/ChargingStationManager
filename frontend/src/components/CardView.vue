<template >
    <div class=" relative">

      <div @click="$emit('select', station)" class=" w-auto h-auto p-3 transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-100/25 ">
        <div class="text-xl font-semibold text-blue-700">{{ station.name }}</div>
        <div class="text-sm text-gray-600">
          <span class="font-medium">Location:</span>
          <template v-if="station.location">
            {{ station.location.latitude.toFixed(4) }}, {{ station.location.longitude.toFixed(4) }}
          </template>
          <template v-else>
            N/A
          </template>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="font-medium">Status:</span>
          <span
            :class="station.status === 'Active' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'"
          >
            {{ station.status }}
          </span>
        </div>
        <div class="text-sm text-gray-600">
          <span class="font-medium">Power Output:</span> {{ station.powerOutput }} kW
        </div>
        <div class="text-sm text-gray-600">
          <span class="font-medium">Connector:</span> {{ station.connectorType }}
        </div>
      </div>
      <div class=" absolute right-0 bottom-0 z-10 w-fit h-auto flex flex-col justify-end gap-5 mb-2 mr-2">
        <img
          @click.stop="$emit('update', station)"
          class=" w-8 h-8 z-10 cursor-pointer shadow-sm shadow-gray-300 rounded-sm p-1"
          src="../assets/logo.svg"
          alt="Update"
        >
        <img
          @click.stop="$emit('delete', station)"
          class=" w-8 h-8 z-10 cursor-pointer shadow-sm shadow-gray-300 rounded-sm p-1"
          src="../assets/logo.svg"
          alt="Delete"
        >
      </div>
    </div>

</template>


  <script setup>
    defineProps({
      station: Object
    })
  </script>

<script>
export default {
  name: "CardView"
}
</script>
