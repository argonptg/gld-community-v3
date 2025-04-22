import { redirect } from '@sveltejs/kit';

export const POST = ({ locals, cookies }) => {
	locals.pb.authStore.clear();
	locals.user = undefined;

	// ensure that no cookies remain
	// ...... yum
	cookies.delete('session', { path: '/' });

	return redirect(303, '/fromlogout');
};
