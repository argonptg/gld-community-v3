import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
    if (locals.user === undefined || !locals.pb.authStore.isValid) {
        return redirect(303, "/login")
    }
}