<!-- BentoGrid.svelte — Vitrine des compétences en grille bento
     Affiche les highlights skills + certifications dans un layout asymétrique. -->
<script lang="ts">
	import { base } from '$app/paths';
	import { langStore } from '$lib/stores/lang.svelte';
	import { t } from '$lib/data/translations';
	import { highlightSkills } from '$lib/data/skills';

	const isFr = $derived(langStore.isFr);
	const s = t.skills;
</script>

<section class="bento-section" id="skills" aria-labelledby="skills-title">
	<div class="container">
		<div class="section-header">
			<span class="section-label">{isFr ? s.label.fr : s.label.en}</span>
			<h2 class="section-title" id="skills-title">{isFr ? s.title.fr : s.title.en}</h2>
			<p class="section-desc">{isFr ? s.desc.fr : s.desc.en}</p>
		</div>

		<div class="bento-grid">
			<!-- Cellule principale : skills tags -->
			<div class="bento-cell bento-large">
				<p class="bento-cell-label">{isFr ? 'Technologies maîtrisées' : 'Core technologies'}</p>
				<div class="tags-cloud">
					{#each highlightSkills as skill}
						<span class="skill-tag tag-{skill.color}">{skill.label}</span>
					{/each}
				</div>
			</div>

			<!-- Cellule : certifications -->
			<div class="bento-cell bento-certs">
				<p class="bento-cell-label">{isFr ? s.certTitle.fr : s.certTitle.en}</p>
				<ul class="cert-list" role="list">
					{#each s.certs as cert}
						<li class="cert-item">
							<span class="cert-dot" style="background: {cert.color};"></span>
							<span class="cert-name">{cert.name}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Cellule : stat hackathons -->
			<div class="bento-cell bento-stat bento-stat-cyan">
				<span class="stat-number">4</span>
				<span class="stat-label">{isFr ? 'Hackathons' : 'Hackathons'}</span>
			</div>

			<!-- Cellule : stat années -->
			<div class="bento-cell bento-stat bento-stat-violet">
				<span class="stat-number">2e</span>
				<span class="stat-label">{isFr ? 'Année CFC' : 'Year CFC'}</span>
			</div>

			<!-- Cellule : lien vers skills -->
			<div class="bento-cell bento-cta-cell">
				<a href="{base}/skills" class="bento-cta-link">
					{isFr ? s.seeAll.fr : s.seeAll.en}
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.bento-section {
		padding: var(--sp-20) 0;
	}

	.section-header {
		margin-bottom: var(--sp-12);
		max-width: 560px;
	}

	.section-desc {
		color: var(--text-muted);
		font-size: var(--fs-sm);
		margin-top: var(--sp-3);
		line-height: 1.6;
	}

	/* Bento grid layout */
	.bento-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto auto;
		gap: var(--sp-4);
	}

	.bento-cell {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--sp-6);
		transition: border-color var(--ease-smooth);
	}

	.bento-cell:hover {
		border-color: var(--border-hover);
	}

	.bento-cell-label {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-dim);
		margin-bottom: var(--sp-4);
	}

	/* Large cell spans 2 columns */
	.bento-large {
		grid-column: 1 / 3;
	}

	.tags-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-2);
	}

	.skill-tag {
		padding: var(--sp-1) var(--sp-3);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		font-weight: 500;
		border: 1px solid;
	}

	.tag-cyan {
		color: var(--accent-cyan);
		border-color: color-mix(in srgb, var(--accent-cyan) 30%, transparent);
		background: color-mix(in srgb, var(--accent-cyan) 8%, transparent);
	}

	.tag-violet {
		color: var(--accent-violet);
		border-color: color-mix(in srgb, var(--accent-violet) 30%, transparent);
		background: color-mix(in srgb, var(--accent-violet) 8%, transparent);
	}

	.tag-green {
		color: var(--accent-green);
		border-color: color-mix(in srgb, var(--accent-green) 30%, transparent);
		background: color-mix(in srgb, var(--accent-green) 8%, transparent);
	}

	.tag-neutral {
		color: var(--text-muted);
		border-color: var(--border);
		background: transparent;
	}

	/* Certifications */
	.bento-certs {
		grid-row: 1;
		grid-column: 3;
	}

	.cert-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
	}

	.cert-item {
		display: flex;
		align-items: center;
		gap: var(--sp-3);
	}

	.cert-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.cert-name {
		font-size: var(--fs-sm);
		color: var(--text-secondary);
		font-weight: 500;
	}

	/* Stats */
	.bento-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: var(--sp-1);
		padding: var(--sp-8) var(--sp-4);
	}

	.bento-stat-cyan {
		border-color: color-mix(in srgb, var(--accent-cyan) 25%, transparent);
		background: color-mix(in srgb, var(--accent-cyan) 4%, var(--bg-secondary));
	}

	.bento-stat-violet {
		border-color: color-mix(in srgb, var(--accent-violet) 25%, transparent);
		background: color-mix(in srgb, var(--accent-violet) 4%, var(--bg-secondary));
	}

	.stat-number {
		font-family: var(--font-display);
		font-size: 2.5rem;
		font-weight: 800;
		line-height: 1;
		color: var(--text-primary);
	}

	.bento-stat-cyan .stat-number { color: var(--accent-cyan); }
	.bento-stat-violet .stat-number { color: var(--accent-violet); }

	.stat-label {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-dim);
	}

	/* CTA link cell */
	.bento-cta-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--sp-4);
	}

	.bento-cta-link {
		font-family: var(--font-mono);
		font-size: var(--fs-sm);
		color: var(--accent-cyan);
		text-decoration: none;
		letter-spacing: 0.02em;
		transition: opacity var(--ease-quick);
	}

	.bento-cta-link:hover {
		opacity: 0.7;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.bento-grid {
			grid-template-columns: 1fr 1fr;
		}

		.bento-large {
			grid-column: 1 / 3;
		}

		.bento-certs {
			grid-column: 1 / 3;
		}
	}

	@media (max-width: 600px) {
		.bento-grid {
			grid-template-columns: 1fr;
		}

		.bento-large,
		.bento-certs {
			grid-column: 1;
		}
	}
</style>
