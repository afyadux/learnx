

import { writable } from "svelte/store";

interface INotification {
    message: string,
    type: "success" | "warning" | "error" | "info",
}


export const notification = writable<INotification | undefined>(undefined);

export function sendNotification(data: INotification, duration: number = 3000) {
    notification.update(() => data);
    setTimeout(() => {
        notification.update(() => undefined);
    }, duration);
}

