<script lang="ts">
	import '$lib/styles/login.scss';

	let email: string = $state(''),
		password: string = $state('');

	let { form } = $props();
</script>

<div class="login">
	<form method="POST" action="?/login">
		<p>Sign in to GLD</p>
		{#if form?.invalid}
			<div class="error">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"
					><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
						d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
					/></svg
				>
				{form.error}
			</div>
		{/if}
		<div class="fields">
			<label for="identity"> Username or Email address </label>
			<input type="text" name="identity" bind:value={email} />
			<label for="password">Password</label>
			<input type="password" name="password" bind:value={password} />
		</div>
		<div class="btns">
			<input type="submit" value="Sign In" />
			<!-- <button formaction="?/register">Sign Up</button> -->
		</div>
	</form>
	<div class="new-user">
		<p>New to Project GLD? <a href="/register">Create an account!</a></p>
	</div>
</div>
