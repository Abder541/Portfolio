<!-- SplitText : anime chaque lettre individuellement (effet "chute de caractères")
     Analogie infra : comme un déploiement rolling — chaque pod (lettre) se lance l'un après l'autre. -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { motionStore } from '$lib/stores/motion.svelte';

	let { text, delay = 0, stagger = 0.05, class: className = '' } = $props();

	let container: HTMLSpanElement;

	onMount(async () => {
		if (motionStore.reduced) return;

		const { gsap } = await import('gsap');
		const chars = container.querySelectorAll('.char');

		gsap.from(chars, {
			yPercent: 120,
			opacity: 0,
			duration: 1,
			ease: 'power4.out',
			stagger,
			delay
		});
	});
</script>

<!-- aria-label sur le container pour que les lecteurs d'écran lisent le mot entier -->
<span bind:this={container} class="split-text {className}" aria-label={text}>
	{#each text.split('') as char}
		<!-- aria-hidden : les lecteurs d'écran ignorent les spans individuels -->
		<span class="char" aria-hidden="true">{char === ' ' ? '\u00A0' : char}</span>
	{/each}
</span>

<style>
	.split-text {
		display: inline-block;
		overflow: hidden;
	}

	.char {
		display: inline-block;
		will-change: transform;
	}
</style>
