// Configuration GSAP + ScrollTrigger
// À appeler une seule fois dans +layout.svelte côté client.

import { browser } from '$app/environment';

// On importe GSAP de façon lazy pour éviter les erreurs SSR
export async function setupGsap() {
	if (!browser) return null;

	const { gsap } = await import('gsap');
	const { ScrollTrigger } = await import('gsap/ScrollTrigger');

	gsap.registerPlugin(ScrollTrigger);

	// Configuration globale
	gsap.defaults({
		ease: 'power3.out',
		duration: 0.9
	});

	return { gsap, ScrollTrigger };
}
