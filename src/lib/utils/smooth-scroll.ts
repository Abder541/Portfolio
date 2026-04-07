// Configuration Lenis — Smooth scroll physique
// Lenis intercepte le scroll natif et applique une physique de rebond.
// Analogie infra : c'est comme un QoS sur le scroll — lisse les "rafales".

import { browser } from '$app/environment';
import { motionStore } from '$lib/stores/motion.svelte';

export async function initSmoothScroll() {
	if (!browser) return null;
	// Respecte la préférence utilisateur — si reduced-motion, pas de smooth scroll
	if (motionStore.reduced) return null;

	const Lenis = (await import('lenis')).default;
	const { gsap } = await import('gsap');
	const { ScrollTrigger } = await import('gsap/ScrollTrigger');

	const lenis = new Lenis({
		duration: 1.2,
		easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		touchMultiplier: 2
	});

	// Synchronise Lenis avec GSAP ScrollTrigger
	lenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add((time: number) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);

	return lenis;
}
