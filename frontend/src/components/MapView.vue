<script setup>
import { defineProps, watch, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { storeToRefs } from 'pinia'
import { useStationStore } from '@/stores/station'

const props = defineProps({
  selectedStation: Object
})

const stationStore = useStationStore()
const { stations } = storeToRefs(stationStore)

let map
let markers = [] // Track all markers

onMounted(() => {
  map = L.map('map').setView([19.076, 72.8777], 11)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map)
})

// Watch for station updates and refresh markers
watch(
  stations,
  (newStations) => {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker))
    markers = []

    const stationList = Array.isArray(newStations) ? newStations : []
    stationList.forEach(station => {
      if (station.location) {
        const marker = L.marker([station.location.latitude, station.location.longitude]).addTo(map)
        marker.bindPopup(`
          <b>${station.name}</b><br />
          Status: ${station.status}<br />
          Power Output: ${station.powerOutput} kW<br />
          Connector: ${station.connectorType}
        `)
        markers.push(marker)
      }
    })
  },
  { immediate: true }
)

// Pan to selected station
watch(
  () => props.selectedStation,
  (station) => {
    if (station && station.location) {
      map.setView([station.location.latitude, station.location.longitude], 15)
    }
  }
)
</script>

<template>
  <div id="map" class="w-full h-full"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
