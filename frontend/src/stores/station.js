import { defineStore } from 'pinia'

const BASE_URL = import.meta.env.VITE_API_URL
const API_URL = `${BASE_URL}stations/`

export const useStationStore = defineStore('station', {
  state: () => ({
    stations: []
  }),

  actions: {
    async fetchStations(token) {
      const res = await fetch(`${API_URL}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()
      this.stations = data
    },

    async addStation(stationData, token) {
      const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(stationData)
      })
      const data = await res.json()
      this.stations.push(data)
    },

    async updateStation(id, updatedData, token) {
      const res = await fetch(`${API_URL}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      })
      const data = await res.json()
      const index = this.stations.findIndex(station => station._id === id)
      if (index !== -1) this.stations[index] = data
    },

    async deleteStation(id, token) {
      await fetch(`${API_URL}${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.stations = this.stations.filter(station => station._id !== id)
    }
  },

  getters: {
    activeStations: state => state.stations.filter(s => s.status === 'Active'),
    stationCount: state => state.stations.length
  }
})
