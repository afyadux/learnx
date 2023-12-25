import { browser } from "$app/environment";
import { auth } from "$lib/firebase/app";
import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import { goto, onNavigate, beforeNavigate } from "$app/navigation";
import { onAuthStateChanged } from "@firebase/auth";


export const load: LayoutLoad = () => {
    
}

