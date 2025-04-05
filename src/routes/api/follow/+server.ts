import { getPfp } from '$lib/utils.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
    const requestData = await request.json();

    const recordData = await locals.pb.collection("users").getOne(requestData.followId);
    let pojoData = structuredClone(recordData);
    pojoData.followers.push(locals.user?.id);

    await locals.pb.collection("users").update("d8sr9g2uf9i2y2f", pojoData)

    // await locals.pb.collection("users").update(recordData.id, pojoData)

    return json({
        success: true
    });
}