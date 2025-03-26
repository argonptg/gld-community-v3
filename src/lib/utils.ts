import type PocketBase from "pocketbase";
import { writable } from "svelte/store";

export const profileStore = writable("");

export const getPfp = async (pocketbase: PocketBase, recordId: string, update: boolean) => {
    pocketbase.autoCancellation(false);

    const rawRecord = await pocketbase.collection("users").getOne(recordId);
    const record = structuredClone(rawRecord);
    
    const token = await pocketbase.files.getToken();
    const picUrl = pocketbase.files.getURL(record, record.avatar, { token: token });

    if (update) profileStore.set(picUrl);

    if (picUrl === undefined) {
        if (update) profileStore.set(`https://api.dicebear.com/9.x/identicon/svg?seed=${recordId}&backgroundColor=ffdfbf,b6e3f4`)
        return `https://api.dicebear.com/9.x/identicon/svg?seed=${recordId}&backgroundColor=ffdfbf,b6e3f4`
    }

    pocketbase.autoCancellation(true);

    return picUrl;
}

export const getBg = async (pocketbase: PocketBase, recordId: string) => {
    pocketbase.autoCancellation(false);

    const rawRecord = await pocketbase.collection("users").getOne(recordId);
    const record = structuredClone(rawRecord);
    
    const token = await pocketbase.files.getToken();
    const picUrl = pocketbase.files.getURL(record, record.background, { token: token });

    if (picUrl === undefined) {
        return `https://api.dicebear.com/9.x/identicon/svg?seed=${recordId}&backgroundColor=ffdfbf,b6e3f4`
    }

    pocketbase.autoCancellation(true);

    return picUrl;
}

export const convertDurationToHours = (duration: string): number => {
    if (duration === "") {
        return 0;
    }

    const regex = /(\d+)\s*d\s*(\d+)\s*h\s*(\d+)\s*m\s*(\d+)\s*s/;
    const matches = duration.match(regex);

    if (matches) {
        const days = parseInt(matches[1]) || 0;
        const hours = parseInt(matches[2]) || 0;
        const minutes = parseInt(matches[3]) || 0;
        const seconds = parseInt(matches[4]) || 0;

        const totalHours = days * 24 + hours + minutes / 60 + seconds / 3600;

        // round the number to 2 decimal points
        return parseFloat(totalHours.toFixed(2));
    }

    return 0;
};