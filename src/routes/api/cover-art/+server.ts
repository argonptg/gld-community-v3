import { SGDB_API } from '$env/static/private';
import SGDB from 'steamgriddb';

export const GET = async ({ url }) => {
	const query = url.searchParams.get('q') ?? '';
	const client = new SGDB(SGDB_API);

	try {
		const games = await client.searchGame(query);

		const grid = await client.getGrids({
			type: 'game',
			id: games[0]?.id ?? 5253321,
			dimensions: ['600x900']
		});

		const result = { url: grid[0].url };

		return new Response(JSON.stringify(result), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600'
			}
		});
	} catch {
		console.log('Failed to query image');

		const fallback = { url: `https://dummyimage.com/600x900/000/${query}` };

		return new Response(JSON.stringify(fallback), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600'
			}
		});
	}
};
