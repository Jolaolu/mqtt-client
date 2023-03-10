import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'


import BrokerConnection from './BrokerConnection.vue'

function mountComponent(): VueWrapper {
    return shallowMount(BrokerConnection)
}

describe('BrokerConnection', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mountComponent()
    })

    it('goes to message and subscription', async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ ref: 'connect' }).attributes().disabled).toBe('true')
        wrapper.findComponent({ ref: 'hostname' }).vm.$emit('update:modelValue', 'foo')
        wrapper.findComponent({ ref: 'username' }).vm.$emit('update:modelValue', 'foo')
        wrapper.findComponent({ ref: 'password' }).vm.$emit('update:modelValue', 'foo')
        wrapper.findComponent({ ref: 'connect' }).trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted('go-to-next')).toBeDefined()
    })
})