<template>
  <div class="h-screen flex flex-col items-center bg-gray-100 px-10">
    <div class=" flex gap-20 ">
      <div class=" w-50 h-10 bg-white"></div>
      <nav class="flex gap-16 p-3 font-medium bg-white rounded-b-xl drop-shadow-xl drop-shadow-blue-50">
        <RouterLink to="/" >Home</RouterLink>
        <RouterLink :to="isLoggedIn ? '/' : '/auth/login'">{{ isLoggedIn ? 'Log Out' : 'Login' }}</RouterLink>
        <RouterLink to="#">Recently Viewed</RouterLink>
        <RouterLink to="#">Favourites</RouterLink>
        <RouterLink to="#">Help</RouterLink>
        <RouterLink to="#">ENG </RouterLink>
      </nav>
    </div>
    <div  class="flex h-auto w-auto mt-5 self-start bg-white rounded-lg rounded-bl-none border-b-[1px] border-gray-200">

        <div
          v-for="(feature, index) in features"
          :key="index"
          :class="[
            'flex px-2 items-center w-fit border-r-2 gap-2 border-gray-200 cursor-pointer',
            { 'opacity-50 pointer-events-none': showForm && activeFeature === feature }
          ]"
          @click="!(showForm && activeFeature === feature) && handleFeatureClick(feature)"
        >
          <img class="w-4 h-4" src="../assets/logo.svg" alt="Logo" />
          <p>{{ feature }}</p>
        </div>

    </div>

    <div class=" w-full h-[90%] flex mb-5">
      <div class="scrollable w-[40%] h-full bg-white rounded-l-xl rounded-tl-none mask overflow-auto">
        <div v-if="!showForm">
          <div v-for="st in station.stations" :key="st._id" class=" w-full h-auto  ">
            <CardView
              :station="st"
              @select="selectedStation = $event"
              @update="handleUpdateStation"
              @delete="handleDeleteStation"
            />
            <div class=" w-full border-b-2 border-gray-200 my-1"></div>
          </div>
        </div>

        <form
          v-if="showForm"
          @submit.prevent="handleFormSubmit"
          class="h-full flex flex-col gap-2 p-4 w-72"
        >
          <h3 class="font-bold mb-2">{{ activeFeature }}</h3>
          <input
            v-model="stationForm.name"
            type="text"
            placeholder="Station Name"
            class="border p-2 rounded"
            required
          />
          <input
            v-model="stationForm.location.latitude"
            type="number"
            step="any"
            placeholder="Latitude"
            class="border p-2 rounded"
            required
          />
          <input
            v-model="stationForm.location.longitude"
            type="number"
            step="any"
            placeholder="Longitude"
            class="border p-2 rounded"
            required
          />
          <select
            v-model="stationForm.status"
            class="border p-2 rounded"
            required
          >
            <option disabled value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input
            v-model="stationForm.powerOutput"
            type="number"
            placeholder="Power Output (kW)"
            class="border p-2 rounded"
            required
          />
          <input
            v-model="stationForm.connectorType"
            type="text"
            placeholder="Connector Type"
            class="border p-2 rounded"
            required
          />
          <div class="flex gap-2 mt-2">
            <button
              type="submit"
              class=" cursor-pointer bg-blue-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              type="button"
              @click="handleFormCancel"
              class="cursor-pointer bg-gray-300 px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div class=" w-full bg-red-500 rounded-r-2xl">
        <MapView :selectedStation="selectedStation" />
      </div>
    </div>
    
  </div>
</template>

<style>
.scrollable {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: thin;  /* Firefox */
}
.scrollable::-webkit-scrollbar { 
    /* display: none;  Safari and Chrome */
    overflow: auto;
    scrollbar-width: thin;
}

</style>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from "vue-router";
import MapView from "@/components/MapView.vue";
import { useStationStore } from "@/stores/station";
import CardView from '@/components/CardView.vue';

const station = useStationStore()
const error = ref('')
const loading = ref(false)
const success = ref(false)
//const editingStation = ref(null)
const token = ref('')
const selectedStation = ref(null)
const features = ref([
  'Refresh',
  'Add station'
])

const activeFeature = ref(null)
const showForm = ref(false)

// Add isLoggedIn ref
const isLoggedIn = ref(false)

const stationForm = ref({
  name: '',
  location: {
    latitude: '',
    longitude: '',
  },
  status: '',
  powerOutput: '',
  connectorType: ''
})

const fetchStations = async (tokenString) => {
  loading.value = true
  try {
    await station.fetchStations(tokenString)

  } catch (e) {
    error.value = 'Failed to fetch stations',e
  } finally {
    loading.value = false
  }
}

// const addStation = async (token) => {
//   try {
//     await station.addStation({ ...newStation.value },token.value)
//     await fetchStations(token.value)
//     newStation.value = { name: '', location: '' }
//     success.value = true
//   } catch (e) {
//     error.value = 'Failed to add station',e
//   }
// }

// const startEdit = (st) => {
//   editingStation.value = { ...st }
// }

// const updateStation = async () => {
//   try {
//     await station.updateStation(editingStation.value,token.value)
//     await fetchStations(token.value)
//     editingStation.value = null
//     success.value = true
//   } catch (e) {
//     error.value = 'Failed to update station',e
//   }
// }

const deleteStation = async (id, tokenValue) => {
  try {
    await station.deleteStation(id, tokenValue)
    await fetchStations(tokenValue)
    success.value = true
  } catch (e) {
    error.value = 'Failed to delete station', e
  }
}

const resetStationForm = () => {
  stationForm.value = {
    name: '',
    location: {
      latitude: '',
      longitude: '',
    },
    status: '',
    powerOutput: '',
    connectorType: ''
  }
}

const fillStationForm = (station) => {
  stationForm.value = {
    name: station.name || '',
      location: {
      latitude: station.location?.latitude ?? '',
      longitude: station.location?.longitude ?? '',
    },
    status: station.status || '',
    powerOutput: station.powerOutput || '',
    connectorType: station.connectorType || ''
  }
}

const handleFeatureClick = (feature) => {
  if (feature === 'Add station') {
    resetStationForm()
    showForm.value = true
    activeFeature.value = 'Add station'
  } else if (feature === 'Refresh') {
    fetchStations(token.value)
    showForm.value = false
    activeFeature.value = null
  }
}

// New handler for update from CardView
const handleUpdateStation = (stationObj) => {
  fillStationForm(stationObj)
  selectedStation.value = stationObj
  showForm.value = true
  activeFeature.value = 'Update station'
}

const handleDeleteStation = async (stationObj) => {
  if (confirm(`Are you sure you want to delete "${stationObj.name}"?`)) {
    await deleteStation(stationObj._id, token.value)
    // If the deleted station was selected, clear selection and form
    if (selectedStation.value && selectedStation.value._id === stationObj._id) {
      selectedStation.value = null
      showForm.value = false
      activeFeature.value = null
    }
  }
}

const handleFormSubmit = async () => {
  if (activeFeature.value === 'Add station') {
    await station.addStation(stationForm.value, token.value)
    await fetchStations(token.value)
  } else if (activeFeature.value === 'Update station') {
    // Use selectedStation.value._id for the update
    await station.updateStation(selectedStation.value._id, stationForm.value, token.value)
    await fetchStations(token.value)
  }
  showForm.value = false
  activeFeature.value = null
}

const handleFormCancel = () => {
  showForm.value = false
  activeFeature.value = null
}

onMounted(() => {
  token.value = localStorage.getItem("token")
  isLoggedIn.value = !!token.value
  if (token.value) {
    fetchStations(token.value) // <-- use token.value, not token
  }
})
</script>

<script>
  export default {
    name: "ChargerListingView",
  }
</script>