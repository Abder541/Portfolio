<!-- /projects/[slug] — Case study pour chaque projet
     Header (gradient + logo techno), résumé, stack, highlights, liens externes, sidebar. -->
<script lang="ts">
	import { base } from '$app/paths';
	import { langStore } from '$lib/stores/lang.svelte';

	let { data } = $props();
	const project = $derived(data.project);
	const isFr = $derived(langStore.isFr);

	const categoryLabels: Record<string, { fr: string; en: string }> = {
		cybersecurity: { fr: 'Cybersécurité', en: 'Cybersecurity' },
		infrastructure: { fr: 'Infrastructure', en: 'Infrastructure' },
		web: { fr: 'Web / Fullstack', en: 'Web / Fullstack' },
		iot: { fr: 'IoT', en: 'IoT' }
	};
</script>

<svelte:head>
	<title>{isFr ? project.titleFr : project.titleEn} — Abderahmane Chaouche</title>
	<meta name="description" content={isFr ? project.summaryFr : project.summaryEn} />
</svelte:head>

<main id="main-content" class="page-content">

	<!-- ===== HEADER ===== -->
	<header
		class="case-header"
		style="background: linear-gradient(135deg, {project.gradientFrom} 0%, {project.gradientTo} 100%);"
	>
		{#if project.detailImage}
			<div
				class="case-header-visual"
				style="--detail-blend-color: {project.gradientFrom};"
			>
				<img
					src="{base}{project.detailImage}"
					alt={isFr ? project.titleFr : project.titleEn}
					class="case-header-img"
					loading="eager"
					decoding="async"
				/>
			</div>
		{/if}

		<div class="container case-header-inner">
			<a href="{base}/projects" class="case-back">
				← {isFr ? 'Retour aux projets' : 'Back to projects'}
			</a>

			<div class="case-header-text">
				<span class="case-category badge badge-sm badge-{project.tagColor}">
					{isFr ? categoryLabels[project.category].fr : categoryLabels[project.category].en}
				</span>
				<h1 class="case-title">{isFr ? project.titleFr : project.titleEn}</h1>
				<p class="case-context">{isFr ? project.contextFr : project.contextEn}</p>
				<p class="case-summary">{isFr ? project.summaryFr : project.summaryEn}</p>
			</div>
		</div>
	</header>

	<!-- ===== BODY ===== -->
	<section class="case-body">
		<div class="container case-layout">

			<!-- MAIN -->
			<div class="case-main">

				<!-- Highlights (ce qui a été fait) -->
				<article class="case-section">
					<h2>{isFr ? 'Ce qui a été fait' : 'What was done'}</h2>
					<ul class="case-list">
						{#each (isFr ? project.highlightsFr : project.highlightsEn) as item}
							<li>{item}</li>
						{/each}
					</ul>
				</article>

				<!-- Stack technique -->
				<article class="case-section">
					<h2>{isFr ? 'Stack technique' : 'Tech stack'}</h2>
					<div class="stack-table-wrapper">
						<table class="stack-table">
							<thead>
								<tr>
									<th>{isFr ? 'Couche' : 'Layer'}</th>
									<th>{isFr ? 'Technologie' : 'Technology'}</th>
								</tr>
							</thead>
							<tbody>
								{#each project.stack as row}
									<tr>
										<td>{isFr ? row.layerFr : row.layerEn}</td>
										<td>{row.tech}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</article>

				<!-- Liens externes -->
				{#if project.links.length > 0}
					<article class="case-section">
						<h2>{isFr ? 'Liens & documentation' : 'Links & documentation'}</h2>
						<div class="case-links">
							{#each project.links as link}
								<a
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									class="case-link-btn btn btn-primary"
								>
									{#if link.icon === 'github'}🔗
									{:else if link.icon === 'doc'}📄
									{:else}↗{/if}
									{isFr ? link.labelFr : link.labelEn}
								</a>
							{/each}
						</div>
					</article>
				{/if}
			</div>

			<!-- SIDEBAR -->
			<aside class="case-sidebar">
				<div class="sidebar-card">
					<p class="sidebar-title">{isFr ? 'Outils & technos' : 'Tools & technologies'}</p>
					<div class="sidebar-tags">
						{#each project.sidebarTags as tag}
							<span class="badge badge-sm badge-neutral">{tag}</span>
						{/each}
					</div>
				</div>

				<div class="sidebar-card">
					<p class="sidebar-title">{isFr ? 'Catégorie' : 'Category'}</p>
					<span class="badge badge-sm badge-{project.tagColor}">
						{isFr ? categoryLabels[project.category].fr : categoryLabels[project.category].en}
					</span>
				</div>

				<div class="sidebar-card">
					<p class="sidebar-title">{isFr ? 'Infos' : 'Info'}</p>
					<ul class="sidebar-info">
						{#each (isFr ? project.infoFr : project.infoEn) as info}
							<li>{info}</li>
						{/each}
					</ul>
				</div>

				<div class="sidebar-cta">
					<a href="{base}/contact" class="btn btn-primary">
						{isFr ? 'Me contacter' : 'Contact me'}
					</a>
					<a href="{base}/projects" class="btn btn-secondary">
						{isFr ? '← Tous les projets' : '← All projects'}
					</a>
				</div>
			</aside>
		</div>
	</section>
</main>

<style>
	.case-header {
		position: relative;
		padding: calc(var(--nav-height) + var(--sp-12)) 0 var(--sp-16);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		overflow: hidden;
	}

	.case-header-inner {
		position: relative;
		z-index: 2;
	}

	.case-back {
		font-family: var(--font-mono);
		font-size: var(--fs-sm);
		color: rgba(255, 255, 255, 0.75);
		text-decoration: none;
		display: inline-block;
		margin-bottom: var(--sp-6);
		transition: color var(--ease-quick);
	}

	.case-back:hover {
		color: #fff;
	}

	.case-header-text {
		display: flex;
		flex-direction: column;
		max-width: 55%;
	}

	.case-category {
		display: inline-block;
		margin-bottom: var(--sp-3);
	}

	.case-title {
		font-family: var(--font-display);
		font-size: clamp(1.75rem, 4vw, 3rem);
		font-weight: 800;
		color: #fff;
		line-height: 1.05;
		letter-spacing: -0.03em;
		margin-bottom: var(--sp-3);
		text-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
	}

	.case-context {
		font-family: var(--font-mono);
		font-size: var(--fs-sm);
		color: rgba(255, 255, 255, 0.7);
		margin-bottom: var(--sp-4);
	}

	.case-summary {
		font-size: var(--fs-md);
		color: rgba(255, 255, 255, 0.85);
		max-width: 600px;
		line-height: 1.6;
	}

	/* RIGHT panel — full-height absolutely-positioned detail banner */
	.case-header-visual {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 45%;
		overflow: hidden;
	}

	.case-header-visual::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to right,
			var(--detail-blend-color, transparent) 0%,
			transparent 50%
		);
		z-index: 1;
		pointer-events: none;
	}

	.case-header-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
	}

	/* BODY */
	.case-body {
		padding: var(--sp-16) 0 var(--sp-20);
	}

	.case-layout {
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: var(--sp-12);
		align-items: start;
	}

	.case-main {
		display: flex;
		flex-direction: column;
		gap: var(--sp-10);
	}

	.case-section h2 {
		font-family: var(--font-display);
		font-size: var(--fs-lg);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--sp-4);
	}

	.case-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
	}

	.case-list li {
		font-size: var(--fs-sm);
		color: var(--text-secondary);
		padding-left: var(--sp-5);
		position: relative;
		line-height: 1.6;
	}

	.case-list li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: var(--accent-cyan);
		opacity: 0.8;
	}

	/* Stack table */
	.stack-table-wrapper {
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.stack-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--fs-sm);
	}

	.stack-table th,
	.stack-table td {
		text-align: left;
		padding: var(--sp-3) var(--sp-4);
	}

	.stack-table thead {
		background: var(--bg-secondary);
	}

	.stack-table th {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		color: var(--accent-cyan);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-weight: 600;
	}

	.stack-table tbody tr {
		border-top: 1px solid var(--border);
	}

	.stack-table td:first-child {
		color: var(--text-primary);
		font-weight: 600;
	}

	.stack-table td:last-child {
		color: var(--text-secondary);
	}

	/* Liens externes */
	.case-links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-3);
	}

	.case-link-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--sp-2);
	}

	/* Sidebar */
	.case-sidebar {
		position: sticky;
		top: calc(var(--nav-height) + var(--sp-4));
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
	}

	.sidebar-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: var(--sp-4);
	}

	.sidebar-title {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-muted);
		margin-bottom: var(--sp-3);
	}

	.sidebar-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.sidebar-info {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--sp-2);
	}

	.sidebar-info li {
		font-size: var(--fs-xs);
		font-family: var(--font-mono);
		color: var(--text-secondary);
	}

	.sidebar-cta {
		display: flex;
		flex-direction: column;
		gap: var(--sp-2);
	}

	.sidebar-cta .btn {
		justify-content: center;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.case-layout {
			grid-template-columns: 1fr;
		}

		.case-header-visual {
			position: relative;
			width: 100%;
			height: 220px;
			margin-top: var(--sp-6);
		}

		.case-header-text {
			max-width: 100%;
		}

		.case-sidebar {
			position: static;
		}
	}
</style>
