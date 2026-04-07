<!-- CustomCursor : curseur personnalisé (cercle + point).
     Masqué sur mobile/écrans tactiles (pointer: coarse).
     Analogie infra : comme un overlay de monitoring — visible par-dessus tout, ne bloque rien. -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { motionStore } from '$lib/stores/motion.svelte';

	let cursor: HTMLDivElement;
	let cursorDot: HTMLDivElement;

	onMount(async () => {
		// Pas de curseur custom sur mobile ou si reduced-motion
		if (window.matchMedia('(pointer: coarse)').matches) return;
		if (motionStore.reduced) return;

		const { gsap } = await import('gsap');

		// quickTo = version optimisée de gsap.to() pour les animations continues (ex: suivi souris)
		// C'est plus performant qu'un gsap.to() classique appelé à chaque mousemove
		const moveX = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3' });
		const moveY = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3' });
		const moveDotX = gsap.quickTo(cursorDot, 'x', { duration: 0.15, ease: 'power3' });
		const moveDotY = gsap.quickTo(cursorDot, 'y', { duration: 0.15, ease: 'power3' });

		window.addEventListener('mousemove', (e) => {
			moveX(e.clientX);
			moveY(e.clientY);
			moveDotX(e.clientX);
			moveDotY(e.clientY);
		});

		// Agrandit le cercle au hover des éléments interactifs
		const addHoverListeners = () => {
			document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
				el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
				el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
			});
		};

		addHoverListeners();

		// MutationObserver : rebranche les listeners quand le DOM change (navigation SPA)
		const observer = new MutationObserver(addHoverListeners);
		observer.observe(document.body, { childList: true, subtree: true });

		return () => observer.disconnect();
	});
</script>

<div class="cursor" bind:this={cursor} aria-hidden="true"></div>
<div class="cursor-dot" bind:this={cursorDot} aria-hidden="true"></div>

<style>
	.cursor {
		position: fixed;
		top: -20px;
		left: -20px;
		width: 40px;
		height: 40px;
		border: 1px solid var(--accent-cyan);
		border-radius: 50%;
		pointer-events: none;
		z-index: var(--z-cursor);
		mix-blend-mode: difference;
		transition:
			transform 0.3s var(--ease-out-quint),
			border-color 0.3s;
		will-change: transform;
	}

	/* .cursor--hover est appliquée via JS (pas dans le template),
	   on utilise :global() pour éviter le warning "unused selector" */
	:global(.cursor--hover) {
		transform: scale(1.8);
		border-color: var(--accent-violet);
	}

	.cursor-dot {
		position: fixed;
		top: -3px;
		left: -3px;
		width: 6px;
		height: 6px;
		background: var(--accent-cyan);
		border-radius: 50%;
		pointer-events: none;
		z-index: var(--z-cursor);
		will-change: transform;
	}

	/* Cache sur écrans tactiles */
	@media (pointer: coarse) {
		.cursor,
		.cursor-dot {
			display: none;
		}
	}
</style>
