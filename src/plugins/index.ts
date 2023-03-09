import mqtt, { type OnCloseCallback, type OnConnectCallback, type OnErrorCallback, type OnMessageCallback, type IClientSubscribeOptions, type IClientPublishOptions } from 'mqtt'


interface IConnectionOptions {
    onopen: () => void
    onconnect: (connack: any) => void
    onerror: (error: Error) => void
    onmessage: (message: String, payload: Buffer, packet: any) => void
    onreconnect: () => void
    onclose: () => void
}
class ConnectionManager {
    intervalID: number | undefined;
    client: mqtt.MqttClient | null = null
    onconnect: OnConnectCallback
    onmessage: OnMessageCallback
    onerror: OnErrorCallback
    onclose: OnCloseCallback
    onreconnect: Function
    wait: number | undefined
    url: string | null = null

    constructor(url: string, wait: number, handler: IConnectionOptions) {
        this.url = url
        this.wait = wait
        const { onconnect, onmessage, onerror, onclose, onreconnect } = handler
        this.onconnect = onconnect
        this.onmessage = onmessage
        this.onreconnect = onreconnect
        this.onerror = onerror
        this.onclose = onclose
    }

    get isConnected() {
        if (this.client?.connected) return true
        return false
    }

    connect() {
        if (this.client === null && this.url) {
            this.client = mqtt.connect(this.url)
            this.client.on('connect', this.onconnect)
            this.client.on('message', this.onmessage)
            this.client.on('reconnect', this.onreconnect)
            this.client.on('error', this.onerror)
            this.client.on('end', this.onclose)
        }
        this.clear()
    }

    retry() {
        if (this.client === null) {
            this.intervalID = window.setInterval(() => {
                this.connect()
            }, this.wait)
        }
    }

    subscribe(topic: string | string[], options: IClientSubscribeOptions, callback: () => void) {
        this.client?.subscribe(topic, options, callback)
    }

    unsubscribe(topic: string | string[], options: IClientSubscribeOptions, callback: () => void) {
        this.client?.unsubscribe(topic, options, callback)
    }

    publish(topic: string, message: string | Buffer, options: IClientPublishOptions, callback: () => void) {
        this.client?.publish(topic, message, options, callback)
    }

    clear() {
        if (this.intervalID == undefined) {
            window.clearInterval(this.intervalID)
            this.intervalID = undefined
        }
    }

    disconnect() {
        if (this.isConnected) {
            this.client?.end()
            this.client = null
        }
        this.clear()
    }
}
export default ConnectionManager