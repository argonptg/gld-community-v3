import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

export const actions = {
	register: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		if (!formData) {
			return fail(400, { missing: true });
		}

		if (data.password !== data.passwordConfirm) {
			return fail(400, {
				error: true,
				match: false
			});
		}

		try {
			const existingUser = await locals.pb
				.collection('users')
				.getFirstListItem(`username="${data.username}"`)
				.catch(() => null);

			if (existingUser) {
				return fail(400, {
					error: true,
					usernameTaken: true,
					message: 'Username is already taken.'
				});
			}

			const randNum = Math.floor(Math.random() * 4);
			const imagePath = path.resolve(`src/assets/${randNum}.jpg`);
			const imageBuf = await fs.readFile(imagePath);
			const imageBlob = new Blob([imageBuf]);
			const imageFile = new File([imageBlob], `${randNum}.jpg`, {
				type: 'image/jpeg'
			});

			const reqData = {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				username: data.username,
				email: data.email,
				avatar: imageFile
			};

			await locals.pb
	            .collection('users')
	            .create(reqData)
	            .then(async (user) => {
		         await locals.pb.collection('games').create({
			            owner: user.id,
		              	games: null 
		          });
		
		       locals.pb.authStore.clear(); 
         	});

			try {
				await locals.pb
					.collection('users')
					.authWithPassword(data.email.toString(), data.password.toString());
			} catch (err) {
				console.log(`Error when logging in: ${err}`);
	
				return fail(401, {
					invalid: true,
					error: 'Incorrect email and password.'
				});
			}

			//return redirect(303, '/settings');

		} catch (err: any) {
			const errorData = err.response?.data;

			if (errorData?.username?.code === 'validation_not_unique') {
				return fail(400, {
					error: true,
					usernameTaken: true,
					message: 'That username is already in use.'
				});
			}

			return fail(400, {
				error: true,
				incorrect: true,
				message: errorData || 'An unexpected error occurred.'
			});
		}
	}
} satisfies Actions;

interface LoginForm {
	identity: string;
	password: string;
}
