<template>
    <div class="dashboard">
        <topic-subscription />
        <message-publishing />
        <section class="disconnect-wrapper">
            <base-button class="disconnect" @click="disconnect">Disconnect</base-button>
        </section>
    </div>
</template>
<script lang="ts">
import { useToast } from "vue-toastification";
import { mqttManager } from '@/plugins/index'
import BaseButton from '@/components/form-elements/BaseButton.vue';
import MessagePublishing from './message-flow/MessagePublishing.vue';
import TopicSubscription from './TopicSubscription.vue';
export default {
    components: {
        BaseButton,
        MessagePublishing,
        TopicSubscription
    },
    setup(_, { emit }) {
        const mqtt = mqttManager()
        const toast = useToast();

        const disconnect = () => {
            mqtt.disconnect()
            toast.error(`App disconnected`);
            emit('go-back')
        }
        return {
            disconnect
        }
    }
}
</script>
<style lang="scss">
.dashboard {
    padding: 0 5rem;

    @include screen(custom, max, 576) {
        padding: 0 1rem;
    }
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
        margin-top: 5rem;
        display: flex;
        justify-content: center;
    }
}
</style>