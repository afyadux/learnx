

import { writable } from "svelte/store";

interface INotification {
    message: string,
    type: "success" | "warning" | "error" | "info" | "transition",
}


export const notification = writable<INotification | undefined>(undefined);

export function sendNotification(data: INotification, duration: number = 4000) {
    notification.update(() => data);

    setTimeout(() => {
        notification.update(() => undefined);
    }, duration);
}

