import type { Actions } from "./$types";
// import { loginWithEmail, pb } from "$lib/pocketbase";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    login: async ({ request, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        if (formData === undefined) return fail(400, { missing: true });

        try {
            const { token, record } = await locals.pb
                .collection("users")
                .authWithPassword(
                    data.identity.toString(), 
                    data.password.toString()
                )
        } catch (err) {
            console.log(err);

            return {
                error: true,
                message: err
            } 
        }
        return redirect(303, "/");
    }
} satisfies Actions

interface LoginForm {
    identity: string,
    password: string
}