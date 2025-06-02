import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(credentials) {
      console.log("login credentialls: ", credentials);

      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      const data = await res.json()
      console.log(data);

      if (!res.ok) throw new Error(data.message || 'Login failed')
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)

    },
    async register(credentials) {
      console.log("register credentialls: ", credentials);
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Register failed')
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)

    },
    logout() {
      this.user = null
      this.token = ''
      localStorage.removeItem('token')
    },
  },
})