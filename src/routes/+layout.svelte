<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Composants UI permanents
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import CustomCursor from '$lib/components/ui/CustomCursor.svelte';
	import BackToTop from '$lib/components/ui/BackToTop.svelte';

	// Stores à initialiser côté client
	import { themeStore } from '$lib/stores/theme.svelte';
	import { langStore } from '$lib/stores/lang.svelte';
	import { motionStore } from '$lib/stores/motion.svelte';

	let { children } = $props();

	onMount(async () => {
		// Initialise les préférences utilisateur (localStorage + media queries)
		// Ordre important : motion d'abord (conditionne les animations)
		motionStore.init();
		themeStore.init();
		langStore.init();

		// Initialise GSAP + ScrollTrigger
		const { setupGsap } = await import('$lib/utils/gsap-setup');
		await setupGsap();

		// Initialise Lenis smooth scroll (sauf si reduced-motion)
		if (!motionStore.reduced) {
			const { initSmoothScroll } = await import('$lib/utils/smooth-scroll');
			await initSmoothScroll();
		}
	});
</script>

<!-- Curseur custom (desktop uniquement, géré en interne) -->
{#if browser}
	<CustomCursor />
{/if}

<!-- Navigation principale -->
<Navbar />

<!-- Contenu de la page courante -->
<main id="main-content">
	{@render children()}
</main>

<!-- Pied de page -->
<Footer />

<!-- Bouton retour en haut -->
<BackToTop />
