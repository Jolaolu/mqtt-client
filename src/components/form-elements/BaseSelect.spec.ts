import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import BaseSelect from './BaseSelect.vue'

function mountComponent(props = {}): VueWrapper {
  return shallowMount(BaseSelect, {
    props
  } as any)
}

describe('BaseSelect', () => {
  it('emits select text', async () => {
    const input = 0
    const wrapper = mountComponent({ modelValue: 0, label: 'foo', selectOptions: [{ text: 'foo', value: 0 }] })
    const select = wrapper.find('.select')
    await wrapper.vm.$nextTick()
      ; (select.element as HTMLSelectElement).value = '0'
    select.trigger('change')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(input)
  })
})
