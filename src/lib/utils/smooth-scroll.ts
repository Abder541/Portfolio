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

	// Recalcule les limites de scroll quand le viewport change (zoom navigateur,
	// pinch-zoom trackpad, redimensionnement). Sans ça, Lenis garde la hauteur
	// initiale et bloque le scroll avant le footer après un zoom.
	const handleResize = () => lenis.resize();
	window.addEventListener('resize', handleResize);
	window.visualViewport?.addEventListener('resize', handleResize);

	// Laisse passer les événements Ctrl+wheel pour que le zoom natif fonctionne
	// (sinon Lenis les consomme comme du scroll).
	const handleWheel = (e: WheelEvent) => {
		if (e.ctrlKey) {
			lenis.stop();
			requestAnimationFrame(() => lenis.start());
		}
	};
	window.addEventListener('wheel', handleWheel, { passive: true });

	return lenis;
}
