export const POST = async ({ locals, request, fetch }) => {
	const requestData = await request.json();

	const recordData = await locals.pb
		.collection('games')
		.getFirstListItem(`owner = "${requestData.id.id}"`);

	// Parallel fetches
	const gridPromises = recordData.games.map((game: any) =>
		fetch(`/api/cover-art?q=${encodeURIComponent(game.name)}`)
			.then((res: any) => res.json())
			.then((data: any) => data.url)
	);

	const grids = await Promise.all(gridPromises);

	return new Response(
		JSON.stringify({
			games: recordData.games,
			grids: grids
		}),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
};
