import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'

import { MqttResponse } from '@/static/mock'

import MessagesTable from './MessagesTable.vue'

function mountComponent(props = {}): VueWrapper {
    return shallowMount(MessagesTable, {
        props
    })
}

describe('MessagesTable', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mountComponent({ items: MqttResponse })
    })
    it('renders component', async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.find('table').exists()).toBe(true)
    })
})