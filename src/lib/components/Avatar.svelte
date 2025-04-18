<script lang="ts">
	let { imgUrl, username, width = 500, height = 500, ...proxy } = $props();
</script>

<a
	style={`
		width: ${width};
		height: ${height};
	`}
	{...proxy}
>
	<img src={imgUrl} alt={username} class="pfp" />
</a>
