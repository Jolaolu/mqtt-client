import type { IQos } from "@/plugins/index.model"

export interface IPublishedItem {
    [key: number]: {
        topic: string,
        message: string
        qos: IQos
    }
}