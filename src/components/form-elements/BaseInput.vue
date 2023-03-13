<template>
  <div class="input-wrapper" tabindex="0" :class="{ invalid: '' }">
    <div v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </div>
    <input ref="passwordRef" required="true" :name="inputName" :value="modelValue" :type="inputType"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" :placeholder="label" class="input"
      autocomplete="none" />
    <div v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </div>
    <button @click="switchVisibility" v-else-if="inputType === 'password'">
      <eye-icon />
    </button>
  </div>
</template>
<script lang="ts" >
import { ref } from 'vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
export default {
  components: {
    EyeIcon
  },
  props: {
    modelValue: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    inputName: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup() {
    const passwordRef = ref<null | HTMLInputElement>(null)
    const switchVisibility = function () {
      if (!passwordRef.value) {
        return
      }

      if (passwordRef.value.type === "password") {
        passwordRef.value.type = "text";
      } else {
        passwordRef.value.type = "password";
      }
    }
    return {
      passwordRef,
      switchVisibility
    }
  },
}
</script>

<style lang="scss">
.input {
  display: flex;
  width: 100%;
  font-size: 1.8rem;
  font-weight: 600;
  outline: none;
  margin-left: 1rem;
  height: 100%;
  background-color: transparent;
  border: none;
  color: $primary-text-color;

  @include screen(custom, max, 576) {
    font-size: 1.6rem;
  }

  &-wrapper {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    height: 6rem;
    padding: 1.2rem;
    border-radius: 0.4rem;
    background-color: $input-background-color;
    border: 1px solid $primary-border-color;

    &.invalid {
      color: $error-color;
      border: 1px solid $error-color;

      &::placeholder {
        color: $error-color;
      }
    }
  }

  &-error {
    position: absolute;
    display: block;
    color: $error-color;

    @include screen(custom, max, 576) {
      font-size: 0.5rem;
    }
  }
}
</style>
