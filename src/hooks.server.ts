
import type { Handle, RequestEvent } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    
    console.log("Request reached server");

    return resolve(event); 
};
