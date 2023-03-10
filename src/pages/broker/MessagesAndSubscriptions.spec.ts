import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'

import MessagesAndSubcriptions from './MessagesAndSubcriptions.vue'

function mountComponent(): VueWrapper {
    return shallowMount(MessagesAndSubcriptions)
}

describe('MessagesAndSubcriptions', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mountComponent()
    })
    it('renders components', async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: 'topic-subscription' }).exists()).toBe(true)
        expect(wrapper.findComponent({ name: 'message-publishing' }).exists()).toBe(true)
    })
    it('disconnects', async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: 'base-button' }).exists()).toBe(true)
        wrapper.findComponent({ name: 'base-button' }).trigger('click')
        expect(wrapper.emitted('go-back')).toBeDefined()
    })
})