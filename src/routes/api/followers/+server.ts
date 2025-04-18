import { getPfp } from '$lib/utils.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const requestData = await request.json();

	let profiles: string[] = [];

	const recordData = await locals.pb.collection('users').getOne(requestData.id, {
		expand: 'followers'
	});

	try {
		for (let i = 0; i < recordData.expand?.followers.length; i++) {
			let follower = recordData.expand?.followers[i];

			if (!follower.avatar) {
				profiles.push(
					`https://api.dicebear.com/9.x/identicon/svg?seed=${follower.username}&backgroundColor=ffdfbf,b6e3f4`
				);

				continue;
			}

			let pfp = await getPfp(locals.pb, follower.id, false);
			profiles.push(pfp);
		}
	} catch (error) {
		return json({
			followers: [],
			profiles: []
		});
	}

	return json({
		...recordData.expand,
		profiles: profiles
	});
};
