import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'

import { publishedItemsMock } from '@/static/mock'

import MessagesTable from './MessagesTable.vue'

function mountComponent(props = {}): VueWrapper {
    return shallowMount(MessagesTable, {
        props
    })
}

describe('MessagesTable', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mountComponent({ publishedItems: publishedItemsMock })
    })
    it('renders component', async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.find('table').exists()).toBe(true)
    })
    it('doesnt component', async () => {
       const wrapper = mountComponent({})
        await wrapper.vm.$nextTick()
        expect(wrapper.find('table').exists()).toBe(false)
        expect(wrapper.find('.empty').exists()).toBe(true)
    })
})