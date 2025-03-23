import { json, redirect } from '@sveltejs/kit';

export const POST = async ({ locals }) => {
    try {
        if (locals.user === undefined) throw new Error("locals.user is undefined");

        await locals.pb.collection("games").getList(1, 1, {
            filter: `owner = "${locals.user.id}"`
        })
        .then(async (record) => {
            await locals.pb.collection("games").delete(record.items[0].id)
        })
        .catch((err) => {
            console.log(err)
        })
        
        //! DANGER ! Account wiping
        await locals.pb.collection("users").delete(locals.user.id);
    } catch (err) {
        console.log(err)

        return json({
            success: false,
            status: 500
        })
    }

    return redirect(303, "/");
}