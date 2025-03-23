import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
    save: async ({ request, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData])

        const file = formData.get("picture") as File;

        let payload: any = {

        };

        // hell
        if (data.displayName !== "") payload["displayName"] = data.displayName;
        if (data.email !== "") payload["email"] = data.email;
        if (data.description !== "") payload["description"] = data.description;
        if (data.password !== "") payload["password"] = data.password; 
        if (data.passwordConfirm !== "") payload["passwordConfirm"] = data.passwordConfirm
        if (file.size !== 0) payload["avatar"] = [ file ];

        // someone help me
        if (data.hide_online === "on") payload["hide_online"] = true;
        if (data.hide_playing === "on") payload["hide_playing"] = true;
        if (data.private_games === "on") payload["private_games"] = true;

        try {
            if (locals.user === undefined) throw Error("user is empty") 

            const { token, record } = await locals.pb.collection("users")
                .update(locals.user.id, payload)

            await locals.pb.collection("users").authRefresh();
        } catch (err) {
            console.log(err)

            return fail(400, {
                error: true,
                message: err
            })
        }        

        return redirect(303, "/settings");
    }
} satisfies Actions

export const load = ({ locals }) => {
    return locals.user;
}