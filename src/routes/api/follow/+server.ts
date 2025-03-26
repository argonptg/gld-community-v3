import { getPfp } from '$lib/utils.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request, fetch }) => {
    const requestData = await request.json();

    const recordData = await locals.pb.collection("followers").getList(1, 1, {
        filter: `follow = "${requestData.followId}"`
    })
    
    const oldFollowers = recordData.items[0].followers

    const data = {
        followers: [
            ...oldFollowers,
            locals.user?.id
        ],
        follow: requestData.followId
    }

    await locals.pb.collection("followers").update(
        recordData.items[0].id, data
    )

    return json({
        success: true
    });
}