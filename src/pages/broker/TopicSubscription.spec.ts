import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'


import TopicSubscription from './TopicSubscription.vue'

function mountComponent(props = {}): VueWrapper {
    return shallowMount(TopicSubscription, {
        props
    })
}

describe('BrokerConnection', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mountComponent()
    })
    it('renders subscription', async () => {
        await wrapper.vm.$nextTick()
        await wrapper.findComponent({ ref: 'subscription-input' }).vm.$emit('update:modelValue', 'foo')
        expect(wrapper.findComponent({ ref: 'subscription-button' }).attributes().disabled).toBe('false')
        await wrapper.vm.$nextTick()
        // testing app interface due  to time constaints 
        const publishSpy = vi.spyOn(wrapper.vm, 'subscribeToTopic')

    })
})