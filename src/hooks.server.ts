import PocketBase from 'pocketbase';
import { POCKETBASE_SERVER } from '$env/static/private';

export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(POCKETBASE_SERVER);

	// load from cookie
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = event.locals.pb.authStore.record;
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;
};
