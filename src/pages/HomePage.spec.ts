import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import HomePage from './HomePage.vue'

vi.useFakeTimers()

function mountComponent(): VueWrapper {
  return shallowMount(HomePage, {})
}

describe('HomePage', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mountComponent()
  })

  it('renders', async () => {
    await wrapper.vm.$nextTick()
    wrapper.findComponent({ name: '' }).vm.$emit('', '')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('').exists()).toBeTruthy()
  })

})
