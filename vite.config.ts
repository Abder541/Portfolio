import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		// Découpe le bundle 3D volumineux en chunks séparés
		// Three.js seul pèse ~600KB min+gzip → lazy-load déjà en place dans HeroScene
		rollupOptions: {
			output: {
				manualChunks(id) {
					// Chunk Three.js pur (géométries, matériaux, renderer)
					if (id.includes('node_modules/three/')) {
						return 'three';
					}
					// Chunk Threlte (wrappers Svelte autour de Three.js)
					if (id.includes('node_modules/@threlte/')) {
						return 'threlte';
					}
					// Chunk GSAP (animations scroll)
					if (id.includes('node_modules/gsap/')) {
						return 'gsap';
					}
				}
			}
		},
		// Relever la limite d'alerte (Three.js restera > 500KB même splitté)
		chunkSizeWarningLimit: 800
	}
});
