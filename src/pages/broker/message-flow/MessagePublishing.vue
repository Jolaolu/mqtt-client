<template>
    <div class="message">
        <h1 class="message-header">Messages</h1>
        <div class="message-input_wrapper">
            <base-input class="message-input" :model-value="messageTopic" input-name="topic" label="Topic"
                @update:modelValue="(newValue: string) => (messageTopic = newValue)" />
            <base-select class="message-select" label="Quality of Service" :model-value="qualityOfService"
                :select-options="selectOptions" />
        </div>
        <textarea class="message-textarea" v-model="messageBody" placeholder="Message Body" />

        <div class="message-button_wrapper">
            <base-button class="message-button" :disabled="isPublishButtonDisabled" @click="publishMessage">Publish
                Message</base-button>
        </div>
        <messages-table />
    </div>
</template>
<script lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/components/form-elements/BaseButton.vue';
import BaseSelect from '@/components/form-elements/BaseSelect.vue';
import BaseInput from '@/components/form-elements/BaseInput.vue';
import MessagesTable from './MessagesTable.vue';
import { isEmptyValue } from '~/helpers'
import { selectOptions } from '@/static/store'
export default {
    components: {
        BaseButton,
        BaseInput,
        BaseSelect,
        MessagesTable
    },
    setup() {
        const messageBody = ref<string>('')
        const messageTopic = ref<string>('')
        const qualityOfService = ref<string>('')

        const isPublishButtonDisabled = computed((): boolean => {
            return (
                isEmptyValue(messageBody.value) ||
                isEmptyValue(messageTopic.value)
            )
        })

        const publishMessage = (): void => {

        }

        return {
            isPublishButtonDisabled,
            messageBody,
            messageTopic,
            publishMessage,
            qualityOfService,
            selectOptions
        }
    }
}
</script>
<style lang="scss">
.message {
    margin-top: 7rem;

    &-input {
        width: 50%;
        margin-right: 3rem;

        @include screen(custom, max, 576) {
            margin-right: 0;
            margin-bottom: 3rem;
        }


        &_wrapper {
            display: flex;
            width: 100%;
            margin-bottom: 1.5rem;
        }
    }

    &-header {
        font-weight: 600;
        color: $primary-text-color;
        font-size: 2.5rem;
        margin-bottom: 3rem;
    }

    &-select {
        width: 50%;
        margin-left: 3rem;

        @include screen(custom, max, 576) {
            margin-left: 0;
        }
    }

    &-textarea {
        width: 100%;
        height: 10rem;
        padding: 2rem;
    }

    &-button {
        margin-top: 1rem;
        color: $white;
        font-size: 1.3rem;
        font-weight: 600;
        background-color: #000000;
        padding: 1.2rem 4.2rem;
        border-radius: 0.4rem;
        &:hover {
            opacity: 0.7;
        }

        &_wrapper {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>