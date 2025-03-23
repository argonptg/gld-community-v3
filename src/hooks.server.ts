import PocketBase from "pocketbase";

export const handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase("http://192.168.1.81:8090"); // https://hardly-noon.pockethost.io

    // load from cookie
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

    if (event.locals.pb.authStore.isValid) {
        // @ts-ignore
        event.locals.user = event.locals.pb.authStore.record;
    }

    const response = await resolve(event);

    response.headers.set(
        "set-cookie", 
        event.locals.pb.authStore.exportToCookie({ secure: false})
    );

    return response;
}