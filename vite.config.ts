import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: [
			"0dae-2804-2488-a081-5bf0-9c7f-555b-e012-1f89.ngrok-free.app",
		]
	}
});
