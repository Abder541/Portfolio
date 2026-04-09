<!-- Marquee.svelte — Bandeau défilant de stats/faits clés
     Défilement CSS pur (pas de JS), pause on hover, respecte prefers-reduced-motion. -->
<script lang="ts">
	import { langStore } from '$lib/stores/lang.svelte';
	import { t } from '$lib/data/translations';

	const items = t.marquee.items;
	// Dupliquer pour boucle infinie seamless
	const doubled = [...items, ...items];
</script>

<div class="marquee-wrapper" aria-hidden="true">
	<div class="marquee-track">
		{#each doubled as item}
			<span class="marquee-item">
				{langStore.isFr ? item.fr : item.en}
				<span class="marquee-sep" aria-hidden="true">◆</span>
			</span>
		{/each}
	</div>
</div>

<style>
	.marquee-wrapper {
		overflow: hidden;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		background: var(--bg-secondary);
		padding: var(--sp-3) 0;
	}

	.marquee-track {
		display: flex;
		gap: 0;
		width: max-content;
		animation: marquee-scroll 40s linear infinite;
	}

	.marquee-wrapper:hover .marquee-track {
		animation-play-state: paused;
	}

	.marquee-item {
		display: inline-flex;
		align-items: center;
		gap: var(--sp-3);
		padding: 0 var(--sp-3);
		font-family: var(--font-mono);
		font-size: var(--fs-sm);
		color: var(--text-muted);
		white-space: nowrap;
	}

	.marquee-sep {
		font-size: 0.5em;
		color: var(--accent-cyan);
		opacity: 0.5;
	}

	@keyframes marquee-scroll {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
	}
</style>
