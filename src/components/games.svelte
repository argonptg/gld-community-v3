<script lang="ts">
	import { writable } from "svelte/store";
    import { convertDurationToHours } from "$lib/utils";

    let userId = $props();
    let games = writable<Game[]>([]);
    let grids = writable<string[]>([]);
    let playedTime = $state();

    $effect(() => {
        fetch("/api/games", {
            method: "POST",
            body: JSON.stringify({
                id: userId
            })
        }).then(async (data) => {
            const res = await data.json();
            games.set(res.games);
            grids.set(res.grids);

            let resTime: number[] = [];

            for (let i = 0; i < res.length; i++) {
                let time = convertDurationToHours(res[i].playedTime || "0d 0h 0m 0s");

                if (time === undefined) return;
                resTime.push(time)
            }

            playedTime = resTime.reduce((acc, current) => acc + current, 0);
        })
    })
</script>

<div class="games">
    {#if $games}
        {#if $games.length > 0}
            <div class="played">
                <span>{$games.length} games played</span>
                <span>{playedTime} hours played in total</span>
            </div>
        
            {#each $games as game, i}
                <div class="game">
                    <div class="cover">
                        <img src={$grids[i]} alt={game.name} height="">
                    </div>
                    <div class="info">
                        <h1>{game.name}</h1>
                        <span>Last played: {game.LastPlayed || "Never"}</span>
                        <span>Time played: {game.playedTime || "0d 0h 0m 0s"}</span>
                    </div>
                </div>
            {/each}
        {/if}
    {:else}
        <div class="played">
            <span>No games available</span>
        </div>
    {/if}
</div>
