import { useMQTT } from 'mqtt-vue-hook'
import type { IQos, IConnectionPayload } from './index.model'

export const mqttManager = () => {
    
    const mqttHook = useMQTT()

    const connect = (payload: IConnectionPayload): Promise<void> => {
        const port = 8884
        const hostname = payload.hostname
        delete payload.hostname

        return mqttHook.connect(`wss://${hostname}:${port}`, {
            ...payload,
            clean: true,
            keepalive: 60,
            clientId: `mqtt_client_${Math.random().toString(16).substring(2, 10)}`,
            connectTimeout: 4000,
            protocolVersion: 4,
            path: '/mqtt',
            resubscribe: false,
            reconnectPeriod: 0,
        })
    }
    const subscribe = (topic: string[]): Promise<void> => {
        return mqttHook.subscribe(topic)
    }
    const publish = (topic: string, message: string, qos: IQos): Promise<void> => {
        return mqttHook.publish(topic, message, qos)
    }
    const unSubscribe = (topic: string): Promise<void> => {
        return mqttHook.unSubscribe(topic)
    }

    const registerEvent = (topic: string, callback: (topic: string, message: string) => void): Promise<void> => {
        return mqttHook.registerEvent(topic, callback)
    }

    const disconnect = (): Promise<void> => {
        return mqttHook.disconnect()
    }
    return { connect, subscribe, publish, unSubscribe, disconnect, registerEvent }
}