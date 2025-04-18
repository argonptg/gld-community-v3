import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	// Check if user is authenticated
	if (!locals.user?.id) {
		return json({ success: false, error: 'Unauthorized.' }, { status: 401 });
	}

	let requestData: { followId?: string };
	try {
		requestData = await request.json();
	} catch (err) {
		return json({ success: false, error: 'Invalid JSON request.' }, { status: 400 });
	}

	const followId = requestData.followId;

	// Validate followId
	if (!followId || typeof followId !== 'string') {
		return json({ success: false, error: 'Invalid follow ID.' }, { status: 400 });
	}
	if (followId === locals.user.id) {
		return json({ success: false, error: 'You cannot follow yourself.' }, { status: 400 });
	}

	try {
		// Fetch the user to be followed
		const recordData = await locals.pb.collection('users').getOne(followId);
		const pojoData = structuredClone(recordData);

		// Ensure followers array exists
		pojoData.followers ??= [];

		// Add current user to followers if not already there
		if (!pojoData.followers.includes(locals.user.id)) {
			pojoData.followers.push(locals.user.id);
			await locals.pb.collection('users').update(followId, pojoData);
		}

		return json({ success: true });
	} catch (err) {
		console.error('Error following user:', err);
		return json({ success: false, error: 'Failed to follow user.' }, { status: 500 });
	}
};
