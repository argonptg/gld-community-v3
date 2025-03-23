import { getPfp } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	// disables autocancelation for 500 fix
	locals.pb.autoCancellation(false);

	const recordList = await locals.pb.collection('users').getList(1, 1, {
		filter: `username = "${params.username}"`,
	});

	const pfp = await getPfp(locals.pb, recordList.items[0].id, false);

	// enables autocancelation
	locals.pb.autoCancellation(true);

	return {
		...recordList,
		profilePicture: pfp
	}
};

export const actions = {
	follow: async ({ request, locals }) => {
		const formData = await request.formData();
		const requestData = Object.assign([...formData])

		const currentFollowers = await locals.pb.collection("followers")
			.getFirstListItem(`follow = "${requestData.id}"`);

		console.log(currentFollowers)

		const data = {
			followers: [
				...requestData.current,
				requestData.new
			],
			follow: requestData.follow
		}

		console.log(data)
	
		// const recordData = await locals.pb.collection("followers")
		// 	.getFirstListItem(`follow = "${requestData.id}"`, {
		// 		expand: "followers"
		// 	});
	
		return {};
	}
}