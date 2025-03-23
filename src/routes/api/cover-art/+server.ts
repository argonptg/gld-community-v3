import { SGDB_API } from '$env/static/private';
import SGDB from 'steamgriddb';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, fetch }) => {
    const query = await request.text();
    const client = new SGDB(SGDB_API);

    const games = await client.searchGame(query);
    const grid = await client.getGrids({
        type: "game",
        id: games[0].id,
        dimensions: ["600x900"]
    });

    return json({
        url: grid[0].url
    });
}