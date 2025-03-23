import { getPfp } from '$lib/utils.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request, fetch }) => {
    const requestData = await request.json();

    const data = {
        followers: [
            ...requestData.current,
            requestData.new
        ],
        follow: requestData.follow
    }

    const recordData = await locals.pb.collection("followers")
        .getFirstListItem(`follow = "${requestData.id}"`, {
            expand: "followers"
        });

    return json({
        success: true
    });
}