<script lang="ts">
	import { onMount } from 'svelte';
	import { motionStore } from '$lib/stores/motion.svelte';

	type Direction = 'up' | 'down' | 'left' | 'right';

	let {
		children,
		delay = 0,
		distance = 60,
		direction = 'up' as Direction,
		class: className = ''
	} = $props();

	let el: HTMLDivElement;

	onMount(async () => {
		if (motionStore.reduced) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		const fromVars: Record<string, number> =
			direction === 'up'
				? { y: distance }
				: direction === 'down'
					? { y: -distance }
					: direction === 'left'
						? { x: -distance }
						: { x: distance };

		gsap.from(el, {
			...fromVars,
			opacity: 0,
			duration: 0.9,
			ease: 'power3.out',
			delay,
			scrollTrigger: {
				trigger: el,
				start: 'top 85%',
				toggleActions: 'play none none reverse'
			}
		});
	});
</script>

<div bind:this={el} class={className}>
	{@render children()}
</div>
