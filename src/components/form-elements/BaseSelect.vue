<template>
  <div class="select-wrapper">
    <select :value="modelValue" name="select" class="select" @change="changeOption($event)">
      <option disabled value="">Please select one</option>
      <option v-for="(option, index) in selectOptions" :key="index" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { isEmptyValue } from '~/helpers'
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    selectOptions: {
      type: Object,
      default: () => { }
    }
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const changeOption = ($event: Event): void => {
      const eventValue = ($event.target as HTMLInputElement).value
      if (!isEmptyValue(eventValue)) {
        emit('update:modelValue', JSON.parse(eventValue))
      }
    }
    return {
      changeOption,
    }
  }
}
</script>
<style lang="scss">
.select {
  width: 100%;
  font-size: 1.8rem;
  font-weight: 600;
  border-radius: 0.4rem;
  padding: 1.7rem 1.2rem;
  background-color: $input-background-color;
  color: $primary-text-color;
  border: 1px solid $primary-border-color;
  margin-top: 1rem;
  &-label {
    font-weight: 600;
    color: $seconday-text-color;
  }
}
</style>
