<template>
  <main class="min-h-screen h-full w-full bg-white text-gray-800">
    
    <section class="h-[70%] flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20  px-4 ">
      <div class="max-w-8xl mx-auto text-center flex flex-col items-center">
        <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Seamlessly Manage Your EV Charging Network
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mx-auto font-normal">
          Real-time monitoring, location tracking, and performance insights for your entire charging station fleet.
        </p>
        <div class="mt-8 flex flex-col justify-center items-center gap-2">
          <a href="/auth/register" class="w-fit bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
            Get Started
          </a>
          <p class=" font-light">Already a member? <a href="/auth/login" class=" underline underline-offset-2"> Sign In</a></p>
        </div>
      </div>
    </section>

    
    <section class="py-16 px-4 md:px-12 bg-gray-50">
      <div class="max-w-6xl mx-auto text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-800">
          Power at Your Fingertips
        </h2>
        <p class="mt-2 text-gray-600 text-lg">
          Everything you need to monitor and manage your charging stations effectively.
        </p>
      </div>
      <div class="grid gap-8 md:grid-cols-3">
        <div class="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition">
          <h3 class="text-xl font-semibold text-indigo-600 mb-2">Live Map View</h3>
          <p class="text-gray-600">Visualize all charging stations across cities with status-based color indicators.</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition">
          <h3 class="text-xl font-semibold text-indigo-600 mb-2">Detailed Station Analytics</h3>
          <p class="text-gray-600">Track power output, usage stats, and performance trends for each station.</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition">
          <h3 class="text-xl font-semibold text-indigo-600 mb-2">Smart Status Management</h3>
          <p class="text-gray-600">Instantly update station availability and get notified of issues in real-time.</p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white px-4 md:px-12 text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Ready to Electrify Your Operations?</h2>
      <p class="text-gray-600 text-lg mb-6">
        Streamline your charging infrastructure with intuitive controls and live insights.
      </p>
      <a href="/auth/register" class="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition">
        Register now
      </a>
    </section>
    <section class=" h-[40%] w-full py-16 bg-gradient-to-bl flex justify-center items-center from-indigo-700 to-indigo-800">
      <p class=" text-white text-xl">contact us section</p>
    </section>
  </main>
</template>
