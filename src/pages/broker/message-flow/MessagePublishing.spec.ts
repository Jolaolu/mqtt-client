import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import MessagePublishing from './MessagePublishing.vue'



function mountComponent(): VueWrapper {
    return shallowMount(MessagePublishing, {})
}

describe('MessagePublishing', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mountComponent()
    })

    it('publishes messages', async () => {
        const publishSpy = vi.spyOn(wrapper.vm, 'publishMessage')

        await wrapper.vm.$nextTick()
        await wrapper.findComponent({ ref: 'topic' }).vm.$emit('update:modelValue', 'foo')
        await wrapper.findComponent({ ref: 'qos' }).vm.$emit('update:modelValue', 0)
        await wrapper.find('.message-textarea').setValue('barr')
        expect(wrapper.findComponent({ ref: 'publish' }).attributes().disabled).toBe('false')
        wrapper.findComponent({ ref: 'publish' }).trigger('click')
        await wrapper.vm.$nextTick()
        // testing app interface due  to time constaints 
        expect(publishSpy).toBeCalled()
    })
})