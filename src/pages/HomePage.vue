<template>
  <header>
    <div class="wrapper"></div>
  </header>
  <main class="home">
    <broker-connection v-if="currentStep === Step.Connection" @go-to-next="goToMessagesAndSubscriptions" />
    <article class="loader" v-if="currentStep === Step.Loading">
      <img src="/src/assets/loader.gif" alt="Loading" />
      <p>Hang on while we're running to connect you.</p>
    </article>
    <messages-and-subcriptions v-if="currentStep === Step.MessagesAndSubscriptions"
      @go-back="updateStep(Step.Connection)" />
  </main>
</template>
<script lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import BrokerConnection from './broker/BrokerConnection.vue'
import MessagesAndSubcriptions from './broker/MessagesAndSubcriptions.vue'
enum Step {
  Connection,
  Loading,
  MessagesAndSubscriptions
}
export default {
  components: {
    BrokerConnection,
    MessagesAndSubcriptions
  },
  setup() {
    const currentStep = ref(Step.MessagesAndSubscriptions)
    const isLoading = ref<boolean>(true)
    const timeOut = ref<number>()


    const goToMessagesAndSubscriptions = (): void => {
      updateStep(Step.MessagesAndSubscriptions)
    }
    const updateStep = (step: Step): void => {
      currentStep.value = step
    }

    onBeforeUnmount(() => {
      clearTimeout(timeOut.value)
    })

    return {
      currentStep,
      goToMessagesAndSubscriptions,
      Step,
      updateStep
    }
  }
}
</script>
<style lang="scss">
.home {
  padding: 10rem 15rem;
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
