<template>
    <h1 class="subscription-header">Subscription</h1>
    <div class="subscription">
        <base-input class="subscription-input" :model-value="subscriptionTopic" input-name="topic" label="Topic"
            @update:modelValue="(newValue: string) => (subscriptionTopic = newValue)" />
        <base-button :disabled="!subscriptionTopic" @click="subscribeToTopic"
            class="subscription-button">Subscribe</base-button>
    </div>
    <div class="subscription-list">
        <Content-card class="subscription-list_item" v-for="(i) in 5" :key="i">
            <check-mark-icon class="subscription-list_icon" />
            <p class="topic"> {{ i }}</p>
            <base-button class="action" @click="$emit('go-back')">unsubscribe</base-button>
        </Content-card>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/form-elements/BaseButton.vue';
import BaseInput from '@/components/form-elements/BaseInput.vue';
import ContentCard from '@/components/card/ContentCard.vue';
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue';

export default {
    components: {
        BaseButton,
        BaseInput,
        CheckMarkIcon,
        ContentCard
    },
    setup() {
        const subscriptionTopic = ref<string>('')

        const subscribeToTopic = (): void => {

        }
        return {
            subscriptionTopic,
            subscribeToTopic
        }
    }
}
</script>
<style lang="scss">
.subscription {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-end;

    &-header {
        font-weight: 600;
        color: $primary-text-color;
        font-size: 2.5rem;
        margin-bottom: 3rem;
    }

    &-input {
        width: 100%;
    }

    &-button {
        margin-top: 4rem;
        color: $white;
        font-size: 1.3rem;
        font-weight: 600;
        background-color: $primary-color;
        padding: 1.2rem 4.2rem;
        border-radius: 0.4rem;

        &:hover {
            opacity: 0.7;
        }
    }

    &-list {
        &_item {
            >.card-content_wrapper {
                display: flex;
                width: 100%;
            }

            .topic {
                width: 85%;
                padding-left: 5rem;
            }

            .action {
                background-color: red;
                color: $white;
                border: none;
                padding: 1rem 2rem;
            }
        }

        &_icon {
            width: 2rem;
            height: 2rem;
        }
    }
}
</style>