import type { IQos } from "@/plugins/index.model"

export interface IPublishedItems {
    [key: number]: {
        topic: string,
        message: string
        qos: IQos
    }
}