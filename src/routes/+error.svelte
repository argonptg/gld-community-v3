<script lang="ts">
	import { page } from '$app/state';
    import '$lib/styles/error.scss';
</script>

<div class="error">
	{#if page.status === 500}
		<h1>{page.status} {page.error?.message}</h1>
		<img
			src="/500.jpg"
			alt="Dead server"
			width="350"
		/>
	{/if}

	{#if page.status === 404}
		<h1>{page.status} {page.error?.message}</h1>
		<img
			src="/404.jpg"
			alt="Dead server"
			width="350"
		/>
	{/if}
</div>
