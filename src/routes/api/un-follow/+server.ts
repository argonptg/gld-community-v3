import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const requestData = await request.json();

	// Buscar o usuário que está sendo "unfollowado"
	const recordData = await locals.pb.collection('users').getOne(requestData.followId);
	const pojoData = structuredClone(recordData);

	// Remover o ID do usuário atual da lista de followers
	pojoData.followers = pojoData.followers.filter((id: string) => id !== locals.user?.id);

	// Atualizar o registro
	await locals.pb.collection('users').update(recordData.id, pojoData);

	return json({
		success: true
	});
};
