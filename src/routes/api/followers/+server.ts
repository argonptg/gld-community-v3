import { getPfp } from '$lib/utils.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request, fetch }) => {
    const requestData = await request.json();
    
    let profiles: string[] = [];

    const recordData = await locals.pb.collection("followers")
        .getFirstListItem(`follow = "${requestData.id}"`, {
            expand: "followers"
        });

    for (let i = 0; i < recordData.expand?.followers.length; i++) {
        let follower = recordData.expand?.followers[i];

        if (!follower.avatar) {
            profiles.push(
                `https://api.dicebear.com/9.x/identicon/svg?seed=${follower.id}&backgroundColor=ffdfbf,b6e3f4`
            );
            
            continue;
        }

        let pfp = await getPfp(locals.pb, follower.id, false);
        profiles.push(pfp)
    }

    return json({
        ...recordData.expand,
        profiles: profiles
    });
}