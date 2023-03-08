<template>
  <header>
    <div class="wrapper"></div>
  </header>
  <main class="home">
  
  </main>
</template>
<script lang="ts">
import { ref, onBeforeUnmount } from 'vue'
enum Step {
  Loading,
}
export default {
  components: {
  },
  setup() {
    const currentStep = ref(Step)
    const isLoading = ref<boolean>(true)
    const timeOut = ref<number>()



    const updateStep = (step: Step): void => {
      currentStep.value = step
    }
 
    onBeforeUnmount(() => {
      clearTimeout(timeOut.value)
    })

    return {
 
    }
  }
}
</script>
<style lang="scss">
.home {
  padding: 10rem 13rem;
  margin: 0 auto;
  @include screen(custom, max, 576) {
    width: 100%;
    padding: 4rem 1.5rem;
  }
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
