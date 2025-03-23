import { getPfp } from '$lib/utils.js';

export const actions = {
    default: async ({ locals, request }) => {
        const formData = await request.formData();
        const query = formData.get('query');

        let ret = [];

        const recordData = await locals.pb.collection("users").getList(0, 50, {
            "filter": `username ~ "${query}"`
        })

        for (let i = 0; i < recordData.items.length; i++) {
            let item = recordData.items[i]

            let data = {
                id: item.id,
                pictureUrl: await getPfp(locals.pb, item.id),
                nowPlaying: item.currently_playing,
                displayName: item.displayName,
                username: item.username,
                online: item.is_online,
                description: item.description
            }

            ret.push(data);
        }

        return {
            success: true,
            data: ret
        } as SearchData;
    }
};