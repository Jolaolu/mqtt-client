import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'


import TopicSubscription from './TopicSubscription.vue'

function mountComponent(): VueWrapper {
    return shallowMount(TopicSubscription as any)
}

describe('BrokerConnection', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mountComponent()
    })
    it('renders subscription', async () => {
        // @ts-expect-error
        const subscribeSpy = vi.spyOn(wrapper.vm, 'subscribeToTopic')

        await wrapper.vm.$nextTick()
        await wrapper.findComponent({ ref: 'subscription-input' }).vm.$emit('update:modelValue', 'foo')
        expect(wrapper.findComponent({ ref: 'subscription-button' }).attributes().disabled).toBe('false')
        wrapper.findComponent({ ref: 'subscription-button' }).trigger('click')
        await wrapper.vm.$nextTick()
        // testing app interface due  to time constaints 
        expect(subscribeSpy).toBeCalled()

    })
})