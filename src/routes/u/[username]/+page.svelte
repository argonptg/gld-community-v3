<script lang="ts">
	import type { PageProps } from './$types';
	import PocketBase from "pocketbase";
	import Games from '../../../components/games.svelte';
	import Followers from '../../../components/followers.svelte';
	import "$lib/styles/profile.scss";
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { data }: PageProps = $props();

	let online = $state(data.items[0].is_online);
	let currentGame = $state(data.items[0].currently_playing);

	onMount(() => {
		const pb = new PocketBase("http://192.168.1.81:8090");

		pb.collection("users").subscribe(data.items[0].id, (event) => {
			online = event.record.is_online;
			currentGame = event.record.currently_playing;
		})

		// this may or may not cause a bug...
		document.body.style.backgroundImage = `url(${data.background})`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.backgroundRepeat = "no-repeat";

		// so it doesn't look janky
		document.body.style.height = '100vh';
	});

	onDestroy(() => {
		if (browser) {
			document.body.style.backgroundImage = "";
		}
	})
</script>

<div class="profile">
	<div class="header">
		<img src={
			data.profilePicture ||
			`https://api.dicebear.com/9.x/identicon/svg?seed=${data.items[0].username}&backgroundColor=ffdfbf,b6e3f4`
		} alt="">

		<div class="name">
			{#if online}
				<h1>
					<span class=online>{data.items[0].displayName}</span>
					<span class="current-game">
						- {currentGame}
					</span>
				</h1>
			{:else}
				<h1>{data.items[0].displayName}</h1>
			{/if}
			<span>/u/{data.items[0].username}</span>
			<p>{data.items[0].description}</p>
		</div>

		<!-- <div class="follow-btn">
			<form action="?/follow" method="post">
				<input type="submit" value="Follow">
			</form>
		</div> -->
	</div>
	<div class="content">
		<Games id={data.items[0].id}/>
		<Followers user={data.items[0]}/>
	</div>
</div>