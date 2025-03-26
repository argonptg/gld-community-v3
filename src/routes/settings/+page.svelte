<script lang="ts">
	import '$lib/styles/settings.scss';
	let { data } = $props();

	// Local state for the file and preview URL
	let picture: any = $state(undefined);
	let background: any = $state(undefined);
	let backgroundUrl: any = $state('');
	let previewUrl: string = $state('');

	//@ts-ignore
	let dialog: HTMLDialogElement = $state();

	// Handler for file input changes
	function handlePFPChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			const file = target.files[0];
			// Create a preview URL for the image
			previewUrl = URL.createObjectURL(file);
			// Optionally update your state if needed
			picture = file;
		}
	}

    function handleBGChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			const file = target.files[0];
			// Create a preview URL for the image
			backgroundUrl = URL.createObjectURL(file);
			// Optionally update your state if needed
			background = file;
		}
	}

	function openModal(event: Event) {
		event.preventDefault();
		dialog.showModal();
	}

	function closeModal(event: Event) {
		event.preventDefault();
		dialog.close();
	}
</script>

<div class="settings">
	<form method="POST" action="?/save" enctype="multipart/form-data">
		<h1>Settings:</h1>

		<div class="images">
			<div class="pfp-upload">
				<!-- Bind the preview URL to the src attribute -->
				<div class="picture">
					<img
						src={previewUrl ||
							data.pfp ||
							`https://api.dicebear.com/9.x/identicon/svg?seed=${data.user.username}&backgroundColor=ffdfbf,b6e3f4`}
						alt="Preview"
					/>
				</div>
				<!-- Use on:change to trigger the file preview update -->
				<label for="picture" class="custom-file-upload">
					<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"
						><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
							d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
						/></svg
					>
				</label>
				<input
					type="file"
					id="picture"
					name="picture"
					accept="image/png, image/jpeg, image/webp"
					onchange={handlePFPChange}
				/>
			</div>

			<div class="bg-upload">
				<!-- Bind the preview URL to the src attribute -->
				<div class="background">
					<img
						src={backgroundUrl ||
							data.bg ||
							`https://api.dicebear.com/9.x/identicon/svg?seed=${data.user.username}&backgroundColor=ffdfbf,b6e3f4`}
						alt="Preview"
					/>
				</div>
				<!-- Use on:change to trigger the file preview update -->
				<label for="background" class="custom-file-upload">
					<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"
						><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
							d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
						/></svg
					>
				</label>
				<input
					type="file"
					id="background"
					name="background"
					accept="image/png, image/jpeg, image/webp"
					onchange={handleBGChange}
				/>
			</div>
		</div>

		<div class="fields">
			<div class="left">
				<label for="displayName">Display name:</label>
				<input type="text" name="displayName" placeholder={data.user.displayName} />
				<label for="email">Email:</label>
				<input type="email" name="email" placeholder={data.user.email} />
				<label for="password">Password:</label>
				<input type="password" name="password" />
				<label for="passwordConfirm">Password confirm:</label>
				<input type="password" name="passwordConfirm" />
			</div>
			<div class="right">
				<div class="desc">
					<label for="description">Description:</label>
					<textarea name="description" cols="29" rows="6" placeholder={data.user.description}
					></textarea>
				</div>

				<label class="switch">
					<input type="checkbox" name="hide_online" bind:checked={data.user.hide_online} />
					<span> Hide online presence </span>
				</label>

				<label class="switch">
					<input type="checkbox" name="hide_playing" bind:checked={data.user.hide_playing} />
					<span> Hide currently playing </span>
				</label>

				<label class="switch">
					<input type="checkbox" name="private_games" bind:checked={data.user.private_games} />
					<span> Hide games </span>
				</label>
			</div>
		</div>

		<div class="btns">
			<!-- <input type="submit" formaction="/api/delete-account" formmethod="POST" value="Delete account"> -->
			<button onclick={openModal}> Delete account </button>
			<input type="submit" formaction="/api/logout" formmethod="POST" value="Sign out" />
			<input type="submit" value="Save" />
		</div>
	</form>

	<dialog class="delete" bind:this={dialog}>
		<form action="/api/delete-account" method="POST">
			<h1>Are you sure you want to delete your account?</h1>
			<p>
				This action is <b>Permanent</b> and <b>Irreversible</b>, you will lose all access to your
				account and all data associated with it will be <b><u>deleted</u></b>.
			</p>
			<p>Are you sure you want to proceed?</p>

			<div class="btns">
				<input type="submit" value="Delete account" />
				<button onclick={closeModal}> Cancel </button>
			</div>
		</form>
	</dialog>
</div>
