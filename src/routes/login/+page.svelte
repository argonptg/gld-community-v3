<script lang="ts">
	// import { loginWithEmail, authStore } from '$lib/pocketbase';
	import '$lib/styles/login.scss';

	let email: string, password: string;
</script>

<div class="login">
	<form method="POST" action="?/login">
		<p>Sign in to GLD</p>
		<div class="fields">
			<label for="identity">
				Username or Email address
			</label>
			<input 
				type="text" 
				name="identity" 
				bind:value={email} 
			/>
			<label for="password">Password</label>
			<input 
				type="password" 
				name="password" 
				bind:value={password} 
			/>
		</div>
		<div class="btns">
			<input type="submit" value="Sign In"/>
			<!-- <button formaction="?/register">Sign Up</button> -->
		</div>
	</form>
	<div class="new-user">
		<p>New to Project GLD? <a href="/register">Create an account!</a></p>
	</div>
</div>
