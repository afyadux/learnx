
import type { Handle, RequestEvent } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    return resolve(event); 
};
