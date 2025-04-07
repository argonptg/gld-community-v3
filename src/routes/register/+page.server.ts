import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { RecordModel } from "pocketbase";

export const actions = {
    register: async ({ request, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        if (formData === undefined) return fail(400, { missing: true });
        if (data.password !== data.passwordConfirm) return fail(400, { 
            error: true,
            match: false
        })

        try {
            const reqData = {
                password: data.password,
                passwordConfirm: data.passwordConfirm,
                username: data.username,
                email: `${data.email}`
            }

            const user = await locals.pb
                .collection("users")
                .create(reqData)

            await locals.pb
                .collection("games")
                .create({
                    owner: user.id,
                    games: null
                })

            locals.pb.authStore.clear(); // forces the user to sign in
        } catch (err: any) {
            console.log(err.response.data);

            return fail(400, {   
                error: true,
                incorrect: true,
                message: err.response.data
            })
        } 

        return redirect(303, "/login");
    }
} satisfies Actions

interface LoginForm {
    identity: string,
    password: string
}