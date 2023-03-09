<template>
    <div class="dashboard">
        <topic-subscription />
        <message-publishing />
        <section class="disconnect-wrapper">
            <base-button class="disconnect" @click="$emit('go-back')">Disconnect</base-button>
        </section>
    </div>
</template>
<script lang="ts">
import BaseButton from '@/components/form-elements/BaseButton.vue';
import MessagePublishing from './message-flow/MessagePublishing.vue';
import TopicSubscription from './TopicSubscription.vue';
export default {
    components: {
        BaseButton,
        MessagePublishing,
        TopicSubscription
    }
}
</script>
<style lang="scss">
.dashboard {
    padding: 0 5rem;
}

.disconnect {
    margin-top: 1rem;
    color: $white;
    font-size: 1.3rem;
    font-weight: 600;
    background-color: red;
    padding: 1.2rem 4.2rem;
    border-radius: 0.4rem;

    &:hover {
        opacity: 0.7;
    }

    &-wrapper {
        display: flex;
        justify-content: center;
    }
}</style>