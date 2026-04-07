<!-- MagneticButton : le bouton est "attiré" vers le curseur au hover.
     Analogie infra : comme un load balancer avec affinité de session — le bouton s'accroche au pointeur. -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { motionStore } from '$lib/stores/motion.svelte';

	let { children, strength = 0.3, class: className = '' } = $props();

	let button: HTMLButtonElement;

	onMount(async () => {
		if (motionStore.reduced) return;
		// Pas d'effet magnétique sur écrans tactiles
		if (window.matchMedia('(pointer: coarse)').matches) return;

		const { gsap } = await import('gsap');

		button.addEventListener('mousemove', (e) => {
			const rect = button.getBoundingClientRect();
			const x = e.clientX - rect.left - rect.width / 2;
			const y = e.clientY - rect.top - rect.height / 2;

			gsap.to(button, {
				x: x * strength,
				y: y * strength,
				duration: 0.6,
				ease: 'power3.out'
			});
		});

		button.addEventListener('mouseleave', () => {
			// Retour élastique à la position initiale
			gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
		});
	});
</script>

<button bind:this={button} class={className}>
	{@render children()}
</button>
