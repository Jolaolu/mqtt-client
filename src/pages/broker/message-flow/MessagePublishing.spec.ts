

it('goes back to previous component', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'base-button' }).exists()).toBe(true)
    wrapper.findComponent({ name: 'base-button' }).vm.$emit('click')
    expect(wrapper.emitted('go-back')).toBeDefined()
})