<!-- /projects — Grille complète des 5 projets avec filtres par catégorie -->
<script lang="ts">
	import { base } from '$app/paths';
	import { langStore } from '$lib/stores/lang.svelte';
	import { projects, type ProjectCategory } from '$lib/data/projects';

	const isFr = $derived(langStore.isFr);

	let activeFilter = $state<ProjectCategory | 'all'>('all');

	const filters: { key: ProjectCategory | 'all'; labelFr: string; labelEn: string }[] = [
		{ key: 'all', labelFr: 'Tous', labelEn: 'All' },
		{ key: 'infrastructure', labelFr: 'Infrastructure', labelEn: 'Infrastructure' },
		{ key: 'cybersecurity', labelFr: 'Cybersécurité', labelEn: 'Cybersecurity' },
		{ key: 'web', labelFr: 'Développement Web', labelEn: 'Web Dev' },
		{ key: 'iot', labelFr: 'IoT', labelEn: 'IoT' }
	];

	const filtered = $derived(
		activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)
	);

	const categoryColors: Record<ProjectCategory, string> = {
		cybersecurity: 'var(--accent-cyan)',
		infrastructure: 'var(--accent-violet)',
		web: 'var(--accent-green)',
		iot: '#ff8080'
	};

	const categoryLabels: Record<ProjectCategory, { fr: string; en: string }> = {
		cybersecurity: { fr: 'Cybersécurité', en: 'Cybersecurity' },
		infrastructure: { fr: 'Infrastructure', en: 'Infrastructure' },
		web: { fr: 'Web', en: 'Web' },
		iot: { fr: 'IoT', en: 'IoT' }
	};
</script>

<svelte:head>
	<title>{isFr ? 'Projets — Abderahmane Chaouche' : 'Projects — Abderahmane Chaouche'}</title>
	<meta
		name="description"
		content={isFr
			? '5 projets IT : SIEM Wazuh, infrastructure Azure, e-commerce fullstack, IoT Raspberry Pi, VMware ESXi.'
			: '5 IT projects: Wazuh SIEM, Azure infrastructure, fullstack e-commerce, Raspberry Pi IoT, VMware ESXi.'}
	/>
</svelte:head>

<main id="main-content" class="page-content">

	<!-- Page Header -->
	<div class="page-header">
		<div class="container">
			<span class="section-label">{isFr ? 'Réalisations' : 'Work'}</span>
			<h1 class="section-title">{isFr ? 'Projets' : 'Projects'}</h1>
			<p class="section-desc">
				{isFr
					? '5 projets techniques réalisés dans le cadre du CFC et en autonomie. Infrastructure, cybersécurité, développement et IoT.'
					: '5 technical projects completed as part of the CFC and independently. Infrastructure, cybersecurity, development and IoT.'}
			</p>
		</div>
	</div>

	<!-- Filtres -->
	<div class="filters-wrapper">
		<div class="container">
			<div class="filters" role="group" aria-label={isFr ? 'Filtrer par catégorie' : 'Filter by category'}>
				{#each filters as f}
					<button
						class="filter-btn {activeFilter === f.key ? 'filter-active' : ''}"
						onclick={() => (activeFilter = f.key)}
						aria-pressed={activeFilter === f.key}
					>
						{isFr ? f.labelFr : f.labelEn}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Grille projets -->
	<section class="projects-section">
		<div class="container">
			<div class="projects-grid">
				{#each filtered as project (project.id)}
					<article class="project-card">
						<!-- Banner -->
						<div
							class="project-banner"
							style="background: linear-gradient(135deg, {project.gradientFrom} 0%, {project.gradientTo} 100%);"
							aria-hidden="true"
						>
							<span
								class="cat-badge"
								style="color: {categoryColors[project.category]}; background: {categoryColors[project.category]}20;"
							>
								{isFr ? categoryLabels[project.category].fr : categoryLabels[project.category].en}
							</span>
						</div>

						<div class="project-body">
							<h2 class="project-title">{isFr ? project.titleFr : project.titleEn}</h2>
							<p class="project-context">{isFr ? project.contextFr : project.contextEn}</p>

							<ul class="project-bullets" role="list">
								{#each (isFr ? project.bulletsFr : project.bulletsEn) as bullet}
									<li>{bullet}</li>
								{/each}
							</ul>

							<div class="project-tags">
								{#each project.tags as tag}
									<span class="badge badge-sm badge-{project.tagColor}">{tag}</span>
								{/each}
							</div>

							{#if project.links.length > 0}
								<div class="project-links">
									{#each project.links as link}
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											class="project-link"
										>
											{#if link.icon === 'github'}🔗{:else if link.icon === 'doc'}📄{:else}↗{/if}
											{isFr ? link.labelFr : link.labelEn}
										</a>
									{/each}
								</div>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="projects-cta">
		<div class="container projects-cta-inner">
			<h2>{isFr ? 'Intéressé par mon profil ?' : 'Interested in my profile?'}</h2>
			<p>
				{isFr
					? 'Je recherche une place d\'apprentissage pour les 3e et 4e années CFC dès août 2026.'
					: "I'm looking for an apprenticeship for the 3rd and 4th years CFC starting August 2026."}
			</p>
			<div class="cta-buttons">
				<a href="{base}/contact" class="btn btn-primary">{isFr ? 'Me contacter' : 'Contact me'}</a>
				<a href="{base}/about" class="btn btn-secondary">{isFr ? 'Mon parcours' : 'My background'}</a>
			</div>
		</div>
	</section>

</main>

<style>
	/* Filtres */
	.filters-wrapper {
		border-bottom: 1px solid var(--border);
		background: var(--bg-secondary);
		padding: var(--sp-4) 0;
	}

	.filters {
		display: flex;
		gap: var(--sp-2);
		flex-wrap: wrap;
	}

	.filter-btn {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		padding: var(--sp-2) var(--sp-4);
		border-radius: var(--radius-sm);
		border: 1px solid var(--border);
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
		transition: all var(--ease-quick);
		letter-spacing: 0.04em;
	}

	.filter-btn:hover {
		border-color: var(--accent-cyan);
		color: var(--accent-cyan);
	}

	.filter-active {
		border-color: var(--accent-cyan) !important;
		color: var(--accent-cyan) !important;
		background: color-mix(in srgb, var(--accent-cyan) 8%, transparent) !important;
	}

	/* Grid */
	.projects-section {
		padding: var(--sp-12) 0 var(--sp-20);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--sp-6);
	}

	/* Card */
	.project-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: border-color var(--ease-smooth), transform var(--ease-smooth);
	}

	.project-card:hover {
		border-color: var(--accent-cyan);
		transform: translateY(-2px);
	}

	.project-banner {
		height: 90px;
		position: relative;
		display: flex;
		align-items: flex-end;
		padding: var(--sp-3);
	}

	.cat-badge {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		padding: 2px 8px;
		border-radius: 4px;
		font-weight: 600;
	}

	.project-body {
		padding: var(--sp-5);
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
		flex: 1;
	}

	.project-title {
		font-family: var(--font-display);
		font-size: var(--fs-base);
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.project-context {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		color: var(--text-dim);
	}

	.project-bullets {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--sp-2);
		flex: 1;
	}

	.project-bullets li {
		font-size: var(--fs-sm);
		color: var(--text-secondary);
		padding-left: var(--sp-4);
		position: relative;
		line-height: 1.5;
	}

	.project-bullets li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: var(--accent-cyan);
		opacity: 0.6;
	}

	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-1);
	}

	.project-links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-2);
		padding-top: var(--sp-2);
		border-top: 1px solid var(--border);
	}

	.project-link {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		color: var(--text-muted);
		text-decoration: none;
		transition: color var(--ease-quick);
	}

	.project-link:hover { color: var(--accent-cyan); }

	/* CTA */
	.projects-cta {
		padding: var(--sp-16) 0;
		background: var(--bg-secondary);
		border-top: 1px solid var(--border);
		text-align: center;
	}

	.projects-cta-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-4);
	}

	.projects-cta h2 {
		font-family: var(--font-display);
		font-size: clamp(1.4rem, 3vw, 1.75rem);
		font-weight: 800;
		color: var(--text-primary);
	}

	.projects-cta p { color: var(--text-muted); max-width: 480px; }

	.cta-buttons {
		display: flex;
		gap: var(--sp-4);
		flex-wrap: wrap;
		justify-content: center;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.projects-grid { grid-template-columns: 1fr 1fr; }
	}

	@media (max-width: 640px) {
		.projects-grid { grid-template-columns: 1fr; }
	}
</style>
