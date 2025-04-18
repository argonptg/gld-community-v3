<script lang="ts">
	import { writable } from 'svelte/store';
	import { convertDurationToHours } from '$lib/utils';
	import { onMount } from 'svelte';

	let userId = $props();
	let games = writable<Game[]>([]);
	let grids = writable<string[]>([]);
	let error = $state('');
	let playedTime = $state();

	$effect(() => {
		games.set([]);
		grids.set([]);
		playedTime = undefined;

		fetch('/api/games', {
			method: 'POST',
			body: JSON.stringify({
				id: userId
			})
		})
			.then(async (data) => {
				const res = await data.json();

				// cheeky fix
				document.body.style.height = 'auto';

				games.set(res.games);
				grids.set(res.grids);

				let resTime: number[] = [];

				for (let i = 0; i < res.games.length; i++) {
					let time = convertDurationToHours(res.games[i].playedTime || '0d 0h 0m 0s');

					if (time === undefined) return;
					resTime.push(time);
				}

				playedTime = resTime.reduce((acc, current) => acc + current, 0).toFixed(2);
			})
			.catch((e) => {
				games.set([]);
				error = 'No games found.';
			});
	});

	let dialogs: HTMLDialogElement[] = []; // ✅ array to hold each game's dialog
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
						<img src={$grids[i]} alt={game.name} />
					</div>
					<div class="info">
						<h1>{game.name}</h1>
						<span>Last played: {game.LastPlayed || 'Never'}</span>
						<span>Time played: {game.playedTime || '0d 0h 0m 0s'}</span>

						{#if game.unlockedachievements}
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<div class="achievements" onclick={() => dialogs[i]?.showModal()}>
								{#each game.unlockedachievements as achievements, j}
									{#if j < 6}
										<img class="achievement" src={achievements.icon} alt={achievements.name} />
									{/if}
								{/each}
							</div>

							<dialog class="ach-list" bind:this={dialogs[i]}>
								<h1
									style={`
                                        ${
																					game.lockedachievements.length <= 0
																						? `color: #FFA336`
																						: ''
																				}
                                    `}
								>
									Achievements:
								</h1>
								<div class="achievements">
									{#each game.unlockedachievements as unlocked}
										<img class="achievement" src={unlocked.icon} alt={unlocked.name} />
									{/each}
									{#each game.lockedachievements as locked}
										<img class="achievement" src={locked.icongray} alt={locked.name} />
									{/each}
								</div>
								<button onclick={() => dialogs[i]?.close()}> Close </button>
							</dialog>
						{/if}
					</div>
				</div>
			{/each}
		{:else}
			<div class="played">
				<h2 id="error">{error}</h2>
			</div>
		{/if}
	{:else}
		<div class="played">
			<span>No games available</span>
		</div>
	{/if}
</div>
