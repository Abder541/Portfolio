<!-- KineticHeading : titre qui apparaît avec un effet de glissement + fondu.
     Utilisé pour les grands titres de section. -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { motionStore } from '$lib/stores/motion.svelte';

	let { text, tag = 'h2', delay = 0, class: className = '' } = $props();

	let el: HTMLElement;

	onMount(async () => {
		if (motionStore.reduced) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(el, {
			y: 40,
			opacity: 0,
			duration: 1,
			ease: 'power4.out',
			delay,
			scrollTrigger: {
				trigger: el,
				start: 'top 80%'
			}
		});
	});
</script>

<!-- Svelte 5 : svelte:element pour rendre la balise dynamique (h1, h2, h3...) -->
<svelte:element this={tag} bind:this={el} class="kinetic-heading {className}">
	{text}
</svelte:element>

<style>
	.kinetic-heading {
		will-change: transform, opacity;
	}
</style>
