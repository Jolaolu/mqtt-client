<template>
    <div class="connection">
        <h1 class="connection-header">Connection</h1>
        <form class="connection-form">
            <div class="connection-hostname">
                <base-input ref="hostname" :model-value="hostName" input-name="hostname" label="Hostname"
                    @update:modelValue="(newValue: string) => (hostName = newValue)" />
            </div>
            <div class="connection-credential">
                <base-input ref="username" class="connection-credential_input" :model-value="userName" input-name="username"
                    label="Username" @update:modelValue="(newValue: string) => (userName = newValue)" />
                <base-input ref="password" class="connection-credential_input" input-type="password" :model-value="userPassword"
                    input-name="password" label="Password"
                    @update:modelValue="(newValue: string) => (userPassword = newValue)" />
            </div>
            <base-button ref="connect" :disabled="isSubmitButtonDisabled" @click="connectToBroker"
                class="connection-button">Connect</base-button>
        </form>
    </div>
</template>
<script lang="ts">
import { ref, computed } from 'vue'
import { useToast } from "vue-toastification";
import BaseButton from '@/components/form-elements/BaseButton.vue';
import BaseInput from '@/components/form-elements/BaseInput.vue';
import { isEmptyValue } from '~/helpers'
import { mqttManager } from '@/plugins/index'
export default {
    emits: ['go-to-next'],
    components: {
        BaseButton,
        BaseInput
    },
    setup(_, { emit }) {
        const userName = ref<string>('')
        const userPassword = ref<string>('')
        const hostName = ref<string>('')
        const mqtt = mqttManager()
        const toast = useToast();

        const isSubmitButtonDisabled = computed((): boolean => {
            return (
                isEmptyValue(userName.value) ||
                isEmptyValue(userPassword.value) ||
                isEmptyValue(hostName.value)
            )
        })

        const connectToBroker = (): void => {
            mqtt.connect({
                hostname: hostName.value,
                username: userName.value,
                password: userPassword.value
            }).then(() => {
                toast.success(`App connected`);
                emit('go-to-next')
            }).catch((error) => {
                toast.error(`Error connecting!`);
                console.log(error)
            })


        }

        return {
            connectToBroker,
            hostName,
            isSubmitButtonDisabled,
            userPassword,
            userName,
        }
    }
}
</script>
<style lang="scss">
.connection {
    margin-top: 10rem;
    width: 100%;
    background-color: $white;
    padding: 4rem 10rem 2rem;
    box-shadow: $primary-box-shadow;
    border: 1px solid $primary-border-color;

    @include screen(custom, max, 576) {
        width: 100%;
        padding: 4rem 2rem;
    }

    &-header {
        font-weight: 600;
        color: $primary-text-color;
        font-size: 2.5rem;
        margin-bottom: 3rem;
    }

    &-button {
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

    &-credential {
        display: flex;
        width: 100%;
        margin: 2rem 0 4rem;

        @include screen(custom, max, 576) {
            flex-direction: column;
        }

        &_input {
            width: 50%;

            @include screen(custom, max, 576) {
                width: 100%;
            }


            &:nth-of-type(even) {
                margin-left: 3rem;

                @include screen(custom, max, 576) {
                    margin-left: 0;
                }
            }

            &:nth-of-type(odd) {
                @include screen(custom, max, 576) {
                    margin-right: 0;
                    margin-bottom: 3rem;
                }

                margin-right: 3rem;
            }
        }
    }

}
</style>