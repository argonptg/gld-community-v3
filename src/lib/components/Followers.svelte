<script lang="ts">
	import { writable } from 'svelte/store';

	let { user } = $props();
	let foll = writable<FollowersResponse>({
		followers: [],
		profiles: []
	});

	$effect(() => {
		fetch('/api/followers', {
			method: 'POST',
			body: JSON.stringify({
				id: `${user.id}`
			})
		})
			.then(async (data) => {
				const res = await data.json();
				foll.set(res);
			})
			.catch((err) => {
				console.log(err);
			});
	});
</script>

<div class="friends">
	{user.displayName || user.username}'s followers
	{#if $foll.followers !== undefined}
		{#if $foll.followers.length > 0}
			{#each $foll.followers as follower, i}
				<div class="follower">
					<img src={$foll.profiles[i]} alt={`${follower.displayName}`} />
					<a href={`/u/${follower.username}`} class="names">
						{#if follower.displayName}
							<span class="display">{follower.displayName}</span>
							<span class="username">/u/{follower.username}</span>
						{:else}
							<span class="display">{follower.username}</span>
						{/if}
					</a>
				</div>
			{/each}
		{/if}
	{:else}
		<div class="follower">
			<span>No followers D:</span>
		</div>
	{/if}
</div>
