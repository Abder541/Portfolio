<!-- ProjectsGrid.svelte — 3 projets vedettes en grille
     Chaque carte affiche : gradient banner, titre, contexte, bullets, tags, liens. -->
<script lang="ts">
	import { base } from '$app/paths';
	import { langStore } from '$lib/stores/lang.svelte';
	import { t } from '$lib/data/translations';
	import { featuredProjects } from '$lib/data/projects';
	import TechLogo from '$lib/components/ui/TechLogo.svelte';

	const isFr = $derived(langStore.isFr);
	const p = t.projects;
</script>

<section class="projects-section" id="projects" aria-labelledby="projects-title">
	<div class="container">
		<div class="section-header">
			<span class="section-label">{isFr ? p.label.fr : p.label.en}</span>
			<h2 class="section-title" id="projects-title">{isFr ? p.title.fr : p.title.en}</h2>
			<p class="section-desc">{isFr ? p.desc.fr : p.desc.en}</p>
		</div>

		<div class="projects-grid">
			{#each featuredProjects as project (project.id)}
				<article class="project-card">
					<a
						href="{base}/projects/{project.id}"
						class="project-card-link"
						aria-label={isFr ? project.titleFr : project.titleEn}
					></a>

					<!-- Banner : image si disponible, sinon gradient + logo techno -->
					<div
						class="project-banner"
						style="background: linear-gradient(135deg, {project.gradientFrom} 0%, {project.gradientTo} 100%);"
						aria-hidden="true"
					>
						{#if project.image}
							<img
								src="{base}{project.image}"
								alt=""
								class="project-banner-img"
								loading="lazy"
								decoding="async"
							/>
						{:else if project.icon}
							<div class="project-banner-logo">
								<TechLogo icon={project.icon} size={72} />
							</div>
						{/if}
						<span class="project-category-badge category-{project.category}">
							{project.category}
						</span>
					</div>

					<div class="project-body">
						<h3 class="project-title">
							{isFr ? project.titleFr : project.titleEn}
						</h3>
						<p class="project-context">
							{isFr ? project.contextFr : project.contextEn}
						</p>

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

		<div class="projects-footer">
			<a href="{base}/projects" class="projects-see-all">
				{isFr ? p.seeAll.fr : p.seeAll.en}
			</a>
		</div>
	</div>
</section>

<style>
	.projects-section {
		padding: var(--sp-20) 0;
		background: var(--bg-secondary);
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	.section-header {
		margin-bottom: var(--sp-12);
		max-width: 560px;
	}

	.section-desc {
		color: var(--text-muted);
		font-size: var(--fs-sm);
		margin-top: var(--sp-3);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--sp-6);
	}

	/* Card */
	.project-card {
		position: relative;
		background: var(--bg-base);
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

	/* Stretched-link : tout le card est cliquable, les liens internes
	   gardent leur propre zone cliquable via z-index plus élevé. */
	.project-card-link {
		position: absolute;
		inset: 0;
		z-index: 1;
		text-decoration: none;
	}

	.project-card-link:focus-visible {
		outline: 2px solid var(--accent-cyan);
		outline-offset: 3px;
		border-radius: var(--radius-lg);
	}

	/* Banner */
	.project-banner {
		height: 140px;
		position: relative;
		display: flex;
		align-items: flex-end;
		padding: var(--sp-3);
		overflow: hidden;
	}

	.project-banner-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.project-banner-logo {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.85);
		filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.5));
		opacity: 0.9;
	}

	.project-category-badge {
		position: relative;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		padding: 2px 8px;
		border-radius: 4px;
		font-weight: 600;
	}

	.category-cybersecurity {
		background: color-mix(in srgb, var(--accent-cyan) 20%, transparent);
		color: var(--accent-cyan);
	}

	.category-infrastructure {
		background: color-mix(in srgb, var(--accent-violet) 20%, transparent);
		color: var(--accent-violet);
	}

	.category-web {
		background: color-mix(in srgb, var(--accent-green) 20%, transparent);
		color: var(--accent-green);
	}

	.category-iot {
		background: rgba(255, 80, 80, 0.2);
		color: #ff8080;
	}

	/* Body */
	.project-body {
		position: relative;
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
		letter-spacing: 0.02em;
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
		margin-top: auto;
	}

	.project-links {
		position: relative;
		z-index: 2;
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-2);
		margin-top: var(--sp-1);
	}

	.project-link {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		color: var(--text-muted);
		text-decoration: none;
		transition: color var(--ease-quick);
	}

	.project-link:hover {
		color: var(--accent-cyan);
	}

	/* Footer */
	.projects-footer {
		margin-top: var(--sp-10);
		text-align: center;
	}

	.projects-see-all {
		font-family: var(--font-mono);
		font-size: var(--fs-sm);
		color: var(--accent-cyan);
		text-decoration: none;
		letter-spacing: 0.02em;
		transition: opacity var(--ease-quick);
	}

	.projects-see-all:hover {
		opacity: 0.7;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.projects-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 640px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
