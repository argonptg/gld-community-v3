<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	// import { loginWithEmail, authStore } from '$lib/pocketbase';
	import '$lib/styles/login.scss';

	// svelte-ignore non_reactive_update
	let email: string, password: string, username: string, confirm: string;
	let formElement: HTMLFormElement | null = null;

	async function ifureadinguaregay() {
		const res = await fetch('https://project-gld.top/api/collections/users/auth-with-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				identity: email,
				password: password
			})
		});

		const data = await res.json();

		if (!res.ok) {
			console.error('Error in additional request:', data.message);
			return;
		}

		console.log('Additional request successful:', data);
	}

	async function handleSubmit(event: Event) {
		if (formElement) {
			event.preventDefault();
			formElement.submit(); // then call this other gay function
		}

		ifureadinguaregay(); // call this gay function before as dummy just to auth-with-pass shows
		// gg ez
	}

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="login">
	<form method="POST" action="?/register" onsubmit={handleSubmit} bind:this={formElement}>
		<p>Sign up for GLD</p>

		{#if form}
			{#if form?.incorrect}
				<div class="error">Email or username already in use</div>
			{/if}
			{#if !form?.match}
				<div class="error">Passwords don't match</div>
			{/if}
		{/if}

		<div class="fields">
			<label for="username"> Username </label>
			<input
				type="text"
				name="username"
				required
				pattern="^[a-z]+$"
				title="The username needs to be lowercase"
				bind:value={username}
			/>
			<label for="email"> Email </label>
			<input type="email" name="email" required bind:value={email} />
			<label for="password"> Password </label>
			<input type="password" name="password" required bind:value={password} />
			<label for="passwordConfirm"> Password Confirm </label>
			<input type="password" name="passwordConfirm" required bind:value={confirm} />
			<div class="tos">
				<input type="checkbox" name="tos" required />
				<label for="tos">I agree to the <a href="/tos">Terms of Service</a></label>
			</div>
		</div>
		<div class="btns">
			<input type="submit" value="Register" />
		</div>
	</form>
	<div class="new-user">
		<p>Already have a account? <a href="/login">Sign In!</a></p>
	</div>
</div>
