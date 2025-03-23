// import PocketBase from "pocketbase";
// import { writable } from "svelte/store";

// export const pb = new PocketBase("https://hardly-noon.pockethost.io");

// export let authStore = writable(pb.authStore.record)
// export let imageStore = writable("");

// pb.authStore.onChange(() => {
// 	console.log("authstore changed")
// 	authStore.set(pb.authStore.record)
// })

// export const loginWithEmail = async (email: string, password: string) => {
// 	await pb.collection("users").authWithPassword(email, password);
// }

// export const getPfp = async (recordId: string) => {
// 	const rawRecord = await pb.collection("users").getOne(recordId);
// 	const record = structuredClone(rawRecord);


// 	const token = await pb.files.getToken();
// 	const picUrl = pb.files.getURL(record, record.avatar, { token: token });

// 	return picUrl;
// }