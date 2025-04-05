import { SGDB_API } from '$env/static/private';
import SGDB from 'steamgriddb';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const query = await request.text();
    const client = new SGDB(SGDB_API);

    const games = await client.searchGame(query);

    const grid = await client.getGrids({
        type: "game",
        id: games[0].id || 5253321,
        dimensions: ["600x900"]
    });

    return json({
        url: grid[0].url || `https://dummyimage.com/600x900/000/${query}`
    });
}