<!-- Marquee : bandeau de texte défilant en boucle infinie.
     Sert à afficher les stats clés : "4 HACKATHONS · CFC 2E ANNÉE · VMWARE ESXI · ..."
     Respecte prefers-reduced-motion (arrêt de l'animation CSS). -->
<script lang="ts">
	let { items, speed = 40 } = $props();
</script>

<div class="marquee" aria-hidden="true">
	<div class="marquee-track" style:animation-duration="{speed}s">
		<!-- Doublé pour un défilement sans coupure visible -->
		{#each [...items, ...items] as item}
			<span class="marquee-item"
				>{item} <span class="separator" aria-hidden="true">·</span></span
			>
		{/each}
	</div>
</div>

<style>
	.marquee {
		overflow: hidden;
		border-top: 1px solid var(--border-default);
		border-bottom: 1px solid var(--border-default);
		padding: var(--sp-4) 0;
		background: var(--bg-surface);
	}

	.marquee-track {
		display: flex;
		gap: var(--sp-8);
		animation: scroll linear infinite;
		white-space: nowrap;
		width: max-content;
	}

	.marquee-item {
		font-family: var(--font-mono);
		font-size: var(--fs-sm);
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.separator {
		color: var(--accent-cyan);
		margin-left: var(--sp-8);
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	/* Arrêt de l'animation si l'utilisateur préfère pas de mouvement */
	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
	}
</style>
