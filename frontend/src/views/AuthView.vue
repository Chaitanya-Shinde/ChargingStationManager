<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-2xl  h-[500px] bg-white p-5 rounded-2xl shadow-lg flex gap-5">
      <div class="w-full bg-blue-100 h-full rounded-xl"> 
        <img src="../assets/authHero.png" alt="" srcset="">
      </div>
      <div class=" w-full h-full flex flex-col items-center justify-center ">
          <h2 class="">Login</h2>
          <div id="btnContainer" class=" justify-center mb-6 space-x-4 ">
            <button
              :class="[
                'px-4 py-2 rounded-full font-semibold',
                mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800',
              ]"
              @click="mode = 'login'"
            >
              Login
            </button>
            <button
              :class="[
                'px-4 py-2 rounded-full font-semibold',
                mode === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800',
              ]"
              @click="mode = 'register'"
            >
              Register
            </button>
          </div>
    
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              v-if="mode === 'register'"
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register' }}
            </button>
            <p v-if="error" class="text-red-600 text-sm text-center mt-2">{{error }}</p>
            <p v-if="success" class="text-blue-600 text-sm text-center mt-2">Success!</p>
          </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const mode = ref('login')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)
const success = ref(false)

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  const modeParam = route.params.mode
  if (modeParam === 'register' || modeParam === 'login') {
    mode.value = modeParam
  } else {
    router.replace({ name: 'Auth', params: { mode: 'login' } }) // fallback
  }
  console.log("Mounted");
  
})
watch(() => route.params.mode,
  (newMode) => {
    if (['login', 'register'].includes(newMode)) {
      mode.value = newMode
    }
  }
)

watch(mode, (newMode) => {
  if (newMode === 'login' || newMode === 'register') {
    router.replace({ name: 'Auth', params: { mode: newMode } })
  }
  console.log("Watching", mode.value);
  
})

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (mode.value === 'login') {
      await auth.login({ email: email.value, password: password.value })
      success.value = true
      
      setTimeout(() => {
        success.value = false
        console.log(success.value);
        
      }, 2000)
      router.push('/listings')
    } else {
      if(password.value != confirmPassword.value){
          error.value = "Passwords do not match!"
          return;
      }
      await auth.register({ email: email.value, password: password.value })
      success.value = true
      setTimeout(() => {
        success.value = false
        console.log(success.value);
        
      }, 2000)
      router.push('/auth/login') 
    }
  } catch (err) {
    error.value = err.message || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}
</script>

<script>
export default {
  name: 'AuthView'
}
</script>
