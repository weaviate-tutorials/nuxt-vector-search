<template>
  <main>
    <Cover />
    <div class="flex justify-center items-center">
      <button type="button" class="button is-rounded"
          :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }" @click="toggleCamera">
          <span v-if="!isCameraOpen">Open Camera</span>
          <span v-else>Close Camera</span>
        </button>
    </div>
    <div class="flex justify-center items-center">
      <div id="app" class="web-camera-container">
      <div class="camera-button">
        
      </div>

      <div v-show="isCameraOpen && isLoading" class="camera-loading">
        <ul class="loader-circle">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box translate-y-[11rem] translate-x-[20rem]" :class="{ 'flash': isShotPhoto }">

        <div class="camera-shutter" :class="{ 'flash': isShotPhoto }"></div>

        <video v-show="!isPhotoTaken" ref="camera" class="rounded-full w-36 h-36" autoplay></video>

        <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="450"></canvas>
      </div>

      
  <div class="flex absolute translate-x-[5rem] -translate-y-[15rem]">
    <a href="/vector" class="block">
    <img
      alt=""
      src="@/public/good.jpg"
      class="h-36 w-full rounded-bl-3xl rounded-tr-3xl object-cover sm:h-64 lg:h-36"
    />
  
    <div class="mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
      <strong class="font-medium">Vector Search</strong>
  
     
    </div>
  </a>
  </div>

  <div class="flex absolute translate-x-[34rem] -translate-y-[15rem]">
    <a href="keyword" class="block">
    <img
      alt=""
      src="@/public/bad.jpg"
      class="h-36 w-full rounded-bl-3xl rounded-tr-3xl object-cover sm:h-64 lg:h-36"
    />
  
    <div class="mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
      <strong class="font-medium">Keyword Search </strong>
  
  
    </div>
  </a>
  </div>


    </div>
      <img src="@/public/paths.png">
    </div>
  </main>
</template>
  
  
<script setup lang="ts">
const loading = ref(false)

const camera = ref(null)
const canvas = ref(null)
const isCameraOpen = ref(false)
const isPhotoTaken = ref(false)
const isShotPhoto = ref(false)
const isLoading = ref(false)
const link = ref('#')

const constraints = reactive({
  audio: false,
  video: true
})

const toggleCamera = () => {
  if(isCameraOpen.value) {
    isCameraOpen.value = false
    isPhotoTaken.value = false
    isShotPhoto.value = false
    stopCameraStream()
  } else {
    isCameraOpen.value = true
    createCameraElement()
  }
}

const createCameraElement = () => {
  isLoading.value = true

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      isLoading.value = false
      camera.value.srcObject = stream
    })
    .catch(error => {
      isLoading.value = false
      alert("May the browser didn't support or there is some errors.")
    })
}

const stopCameraStream = () => {
  let tracks = camera.value.srcObject.getTracks()

  tracks.forEach(track => {
    track.stop()
  })
}

const takePhoto = () => {
  if(!isPhotoTaken.value) {
    isShotPhoto.value = true

    const FLASH_TIMEOUT = 50

    setTimeout(() => {
      isShotPhoto.value = false
    }, FLASH_TIMEOUT)
  }

  isPhotoTaken.value = !isPhotoTaken.value

  const context = canvas.value.getContext('2d')
  context.drawImage(camera.value, 0, 0, 450, 337.5)
}


onMounted(() => {
  camera.value = document.getElementById("camera")
  canvas.value = document.getElementById("photoTaken")
})



</script>
  