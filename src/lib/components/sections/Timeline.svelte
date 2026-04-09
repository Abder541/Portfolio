<!-- Timeline.svelte — Chronologie compacte de la page d'accueil
     Affiche les items de timeline avec point coloré et ligne verticale. -->
<script lang="ts">
	import { base } from '$app/paths';
	import { langStore } from '$lib/stores/lang.svelte';
	import { t } from '$lib/data/translations';
	import { timelineItems } from '$lib/data/timeline';

	const isFr = $derived(langStore.isFr);
	const tl = t.timeline;

	// Icône selon le type
	const typeIcon: Record<string, string> = {
		education: '🎓',
		work: '💼',
		hackathon: '⚡',
		certification: '🏅',
		goal: '🎯'
	};
</script>

<section class="timeline-section" id="timeline" aria-labelledby="timeline-title">
	<div class="container">
		<div class="section-header">
			<span class="section-label">{isFr ? tl.label.fr : tl.label.en}</span>
			<h2 class="section-title" id="timeline-title">{isFr ? tl.title.fr : tl.title.en}</h2>
		</div>

		<div class="timeline-list" role="list">
			{#each timelineItems as item}
				<div class="timeline-item {item.highlight ? 'timeline-highlight' : ''}" role="listitem">
					<div class="timeline-icon" aria-hidden="true">
						{typeIcon[item.type]}
					</div>
					<div class="timeline-content">
						<p class="timeline-date">{isFr ? item.dateFr : item.dateEn}</p>
						<p class="timeline-title-text">{isFr ? item.titleFr : item.titleEn}</p>
						<p class="timeline-desc-text">{isFr ? item.descFr : item.descEn}</p>
					</div>
				</div>
			{/each}
		</div>

		<div class="timeline-footer">
			<a href="{base}/about" class="timeline-see-all">
				{isFr ? tl.seeAll.fr : tl.seeAll.en}
			</a>
		</div>
	</div>
</section>

<style>
	.timeline-section {
		padding: var(--sp-20) 0;
	}

	.section-header {
		margin-bottom: var(--sp-12);
	}

	.timeline-list {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
		max-width: 720px;
	}

	/* Ligne verticale */
	.timeline-list::before {
		content: '';
		position: absolute;
		left: 19px;
		top: 8px;
		bottom: 8px;
		width: 1px;
		background: linear-gradient(
			to bottom,
			var(--accent-cyan),
			color-mix(in srgb, var(--accent-violet) 60%, transparent),
			transparent
		);
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: var(--sp-4);
		padding: var(--sp-4) 0;
		position: relative;
	}

	.timeline-item + .timeline-item {
		border-top: 1px solid var(--border);
	}

	.timeline-highlight {
		background: color-mix(in srgb, var(--accent-cyan) 3%, transparent);
		border-radius: var(--radius-md);
		padding: var(--sp-4) var(--sp-3);
		margin: var(--sp-2) 0;
		border: 1px solid color-mix(in srgb, var(--accent-cyan) 20%, transparent) !important;
	}

	.timeline-highlight + .timeline-item,
	.timeline-item + .timeline-highlight {
		border-top: none;
	}

	.timeline-icon {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 2px;
		font-size: 1.1rem;
		position: relative;
		z-index: 1;
		background: var(--bg-base);
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid var(--border);
		align-items: center;
		flex-shrink: 0;
	}

	.timeline-highlight .timeline-icon {
		border-color: color-mix(in srgb, var(--accent-cyan) 40%, transparent);
		background: color-mix(in srgb, var(--accent-cyan) 8%, var(--bg-base));
	}

	.timeline-content {
		display: flex;
		flex-direction: column;
		gap: var(--sp-1);
	}

	.timeline-date {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		color: var(--text-dim);
		letter-spacing: 0.05em;
	}

	.timeline-highlight .timeline-date {
		color: var(--accent-cyan);
	}

	.timeline-title-text {
		font-size: var(--fs-sm);
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.4;
	}

	.timeline-desc-text {
		font-size: var(--fs-sm);
		color: var(--text-muted);
		line-height: 1.5;
	}

	.timeline-footer {
		margin-top: var(--sp-8);
	}

	.timeline-see-all {
		font-family: var(--font-mono);
		font-size: var(--fs-sm);
		color: var(--accent-cyan);
		text-decoration: none;
		letter-spacing: 0.02em;
		transition: opacity var(--ease-quick);
	}

	.timeline-see-all:hover {
		opacity: 0.7;
	}
</style>
