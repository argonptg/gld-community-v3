import { getPfp } from '$lib/utils.js';

export const load = async ({ locals }) => {
	if (locals.user && locals.pb.authStore.isValid) {
		let picUrl = await getPfp(locals.pb, locals.user.id, true);

		if (picUrl === '')
			picUrl = `https://api.dicebear.com/9.x/identicon/svg?seed=${locals.user.username}&backgroundColor=ffdfbf,b6e3f4`;

		return {
			profile: structuredClone(locals.user),
			pfp: picUrl
		};
	}
};
