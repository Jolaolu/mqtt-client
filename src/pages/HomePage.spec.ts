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

  it('renders loading state after user connection', async () => {
    await wrapper.vm.$nextTick()
    wrapper.findComponent({ name: 'broker-connection' }).vm.$emit('go-to-next')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.loader').exists()).toBeTruthy()
  })

  it('renders subscription and messages ', async () => {
    wrapper.findComponent({ name: 'broker-connection' }).vm.$emit('go-to-next')
    vi.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({
      name: 'messages-and-subcriptions'
    }).exists()).toBeTruthy()
  })

  it('goes back to connection page', async () => {
    wrapper.findComponent({ name: 'broker-connection' }).vm.$emit('go-to-next')
    vi.runAllTimers()
    await wrapper.vm.$nextTick()
    wrapper.findComponent({ name: 'messages-and-subcriptions' }).vm.$emit('go-back')
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'broker-connection' }).exists()).toBe(true)
  })

})
