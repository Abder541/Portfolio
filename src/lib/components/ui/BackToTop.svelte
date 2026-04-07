<!-- BackToTop : bouton "retour en haut" qui apparaît après 400px de scroll. -->
<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		const handleScroll = () => {
			visible = window.scrollY > 400;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<button
	class="back-to-top"
	class:visible
	onclick={scrollToTop}
	aria-label="Retour en haut de la page"
>
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<polyline points="18 15 12 9 6 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</button>

<style>
	.back-to-top {
		position: fixed;
		bottom: var(--sp-8);
		right: var(--sp-8);
		z-index: calc(var(--z-nav) - 1);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: var(--r-sm);
		background: var(--bg-surface-2);
		border: 1px solid var(--border-default);
		color: var(--text-secondary);
		cursor: pointer;
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity var(--dur-base) var(--ease-out-quint),
			transform var(--dur-base) var(--ease-out-quint),
			color var(--dur-base),
			border-color var(--dur-base),
			background var(--dur-base);
		pointer-events: none;
	}

	.back-to-top.visible {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.back-to-top:hover {
		color: var(--accent-cyan);
		border-color: var(--accent-cyan);
		background: rgba(0, 212, 255, 0.05);
		box-shadow: var(--shadow-glow-cyan);
	}

	@media (max-width: 768px) {
		.back-to-top {
			bottom: var(--sp-4);
			right: var(--sp-4);
		}
	}
</style>
