<!-- CTAContact.svelte — Section CTA pleine largeur en bas de la home
     Invite à contacter ou voir le parcours. Badge disponibilité + deux boutons. -->
<script lang="ts">
	import { base } from '$app/paths';
	import { langStore } from '$lib/stores/lang.svelte';
	import { t } from '$lib/data/translations';

	const isFr = $derived(langStore.isFr);
	const c = t.cta;
</script>

<section class="cta-section" aria-labelledby="cta-title">
	<div class="cta-glow" aria-hidden="true"></div>
	<div class="container cta-inner">
		<div class="cta-badge badge badge-green">
			<span class="badge-dot" aria-hidden="true"></span>
			{isFr ? 'Disponible août 2026' : 'Available August 2026'}
		</div>

		<h2 class="cta-title" id="cta-title">
			{isFr ? c.title.fr : c.title.en}
		</h2>

		<p class="cta-desc">
			{isFr ? c.desc.fr : c.desc.en}
		</p>

		<div class="cta-buttons">
			<a href="{base}/contact" class="btn btn-primary">{isFr ? c.contact.fr : c.contact.en}</a>
			<a href="{base}/about" class="btn btn-secondary">{isFr ? c.about.fr : c.about.en}</a>
		</div>
	</div>
</section>

<style>
	.cta-section {
		padding: var(--sp-24) 0;
		position: relative;
		overflow: hidden;
		border-top: 1px solid var(--border);
		background: var(--bg-secondary);
		text-align: center;
	}

	/* Glow d'ambiance centré */
	.cta-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		height: 300px;
		background: radial-gradient(ellipse at center,
			color-mix(in srgb, var(--accent-cyan) 10%, transparent) 0%,
			transparent 70%
		);
		pointer-events: none;
	}

	.cta-inner {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-6);
	}

	.cta-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--sp-2);
	}

	.badge-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent-green);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(1.3); }
	}

	.cta-title {
		font-family: var(--font-display);
		font-size: clamp(1.75rem, 4vw, 2.75rem);
		font-weight: 800;
		color: var(--text-primary);
		line-height: 1.1;
		letter-spacing: -0.02em;
		max-width: 600px;
	}

	.cta-desc {
		font-size: var(--fs-base);
		color: var(--text-muted);
		max-width: 480px;
		line-height: 1.6;
	}

	.cta-buttons {
		display: flex;
		gap: var(--sp-4);
		flex-wrap: wrap;
		justify-content: center;
		margin-top: var(--sp-2);
	}

	@media (prefers-reduced-motion: reduce) {
		.badge-dot {
			animation: none;
		}
	}
</style>
