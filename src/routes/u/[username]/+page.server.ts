export const prerender = false;

import { getBg, getPfp } from '$lib/utils';
import type { PageServerLoad } from './$types';
import { POCKETBASE_SERVER } from '$env/static/private';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	// disables autocancelation for 500 fix
	locals.pb.autoCancellation(false);

	const recordList = await locals.pb.collection('users').getList(1, 1, {
		filter: `username = "${params.username}"`
	});

	const pfp = await getPfp(locals.pb, recordList.items[0].id, false);
	const bg = await getBg(locals.pb, recordList.items[0].id);

	// enables autocancelation
	locals.pb.autoCancellation(true);

	return {
		...recordList,
		profilePicture: pfp,
		background: bg,
		currentId: locals.user?.id || '',
		pbServer: POCKETBASE_SERVER
	};
};

export const actions = {
	follow: async ({ request, locals }) => {
		const formData = await request.formData();
		const requestData = Object.assign([...formData]);

		const currentFollowers = await locals.pb.collection('users').getOne(requestData.follow);

		const data = {
			followers: [...requestData.current, requestData.new],
			follow: requestData.follow
		};

		console.log(data);
		return {};
	}
};
