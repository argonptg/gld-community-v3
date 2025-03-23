export const POST = async ({ locals, request, fetch }) => {
    const requestData = await request.json();
    
    const recordData = await locals.pb.collection("games")
        .getFirstListItem(`owner = "${requestData.id.id}"`);

    let grids = [];

    for (let game of recordData.games) {
        const data = await fetch("/api/cover-art", {
            method: "POST",
            body: game.name
        }).then(response => response.json())

        grids.push(data.url);
    }

    return new Response(JSON.stringify({
        games: recordData.games,
        grids: grids,
    }));
}