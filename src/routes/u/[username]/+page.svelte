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
	let isFollowing = $state();
	const pb = new PocketBase("http://192.168.1.81:8090");

	onMount(() => {
		isFollowing = data.items[0].followers.includes(data.currentId);

		// subscribe to the users collection
		pb.collection("users").subscribe(data.items[0].id, (event) => {
			online = event.record.is_online;
			currentGame = event.record.currently_playing;
			
			let followerList = event.record.followers as string[];

			isFollowing = followerList.includes(data.currentId);
		})

		// this may or may not cause a bug...
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.backgroundRepeat = "no-repeat";
		document.body.style.backgroundImage = `url(${data.background})`;

		// so it doesn't look janky
		document.body.style.height = '100vh';
	});

	onDestroy(() => {
		if (browser) {
			document.body.style.backgroundImage = "";
		}

		pb.collection("*").unsubscribe("*")
	})

	async function followUser() {
		await fetch("/api/follow", {
			method: "POST",
			body: JSON.stringify({
				followId: data.items[0].id
			})
		})
	}

	async function unFollowUser() {
		await fetch("/api/un-follow", {
			method: "POST",
			body: JSON.stringify({
				followId: data.items[0].id
			})
		})
	}
</script>

<div class="profile">
	<div class="header">
		<div class="wrapper">
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
		</div>

		{#if data.items[0].id !== data.currentId}
			{#if isFollowing}
				<div class="follow-btn">
					<button onclick={unFollowUser}>Unfollow</button>
				</div>
			{:else}
				<div class="follow-btn">
					<button onclick={followUser}>Follow</button>
				</div>
			{/if}
		{/if}
	</div>
	<div class="content">
		<Games id={data.items[0].id}/>
		<Followers user={data.items[0]}/>
	</div>
</div>