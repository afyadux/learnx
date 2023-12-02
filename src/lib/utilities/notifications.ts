

import { writable } from "svelte/store";

interface INotification {
    message: string,
    type: NotificationState
}

export enum NotificationState {
    success,
    warning,
    error,
    info
}

export const notification = writable<INotification | undefined>(undefined);

export function sendNotification(data: INotification) {
    notification.update(() => data);
    setTimeout(() => {
        notification.update(() => undefined);
    }, 2000);
}

