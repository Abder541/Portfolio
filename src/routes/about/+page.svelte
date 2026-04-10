<!-- /about — Parcours d'Abderahmane : profil, timeline, certifications, formation -->
<script lang="ts">
	import { base } from '$app/paths';
	import { langStore } from '$lib/stores/lang.svelte';
	import { timelineItems } from '$lib/data/timeline';

	const isFr = $derived(langStore.isFr);

	const certifications = [
		{ name: 'Fortinet FCF', color: '#10d9a0', dateFr: 'Mars 2026', dateEn: 'March 2026', tag: 'Cybersécurité' },
		{ name: 'Cisco Cybersecurity', color: '#4f8ef7', dateFr: 'Mars 2026', dateEn: 'March 2026', tag: 'Networking Academy' },
		{ name: 'Azure AI Essentials', color: '#0078d4', dateFr: 'Mars 2026', dateEn: 'March 2026', tag: 'Microsoft' }
	];

	const typeIcon: Record<string, string> = {
		education: '🎓',
		work: '💼',
		hackathon: '⚡',
		certification: '🏅',
		goal: '🎯'
	};
</script>

<svelte:head>
	<title>{isFr ? 'Parcours — Abderahmane Chaouche' : 'Background — Abderahmane Chaouche'}</title>
	<meta
		name="description"
		content={isFr
			? 'Formation CFC Informaticien en cours, 4 hackathons, certifications Fortinet, Cisco, Azure. Disponible août 2026.'
			: 'Ongoing IT CFC apprenticeship, 4 hackathons, Fortinet, Cisco, Azure certifications. Available August 2026.'}
	/>
</svelte:head>

<main id="main-content" class="page-content">

	<!-- Page Header -->
	<div class="page-header">
		<div class="container">
			<span class="section-label">{isFr ? 'À propos' : 'About'}</span>
			<h1 class="section-title">{isFr ? 'Mon parcours' : 'My background'}</h1>
			<p class="section-desc">
				{isFr
					? 'Formation CFC en cours, 4 hackathons, expériences professionnelles en parallèle. Recherche d\'une place d\'apprentissage en entreprise dès août 2026.'
					: 'Ongoing IT apprenticeship (CFC), 4 hackathons, work experience alongside studies. Looking for a company apprenticeship starting August 2026.'}
			</p>
		</div>
	</div>

	<!-- Main content : 2 colonnes -->
	<section class="about-section">
		<div class="container about-grid">

			<!-- LEFT : profil + infos + certifs -->
			<div class="about-left">

				<!-- Carte profil -->
				<div class="profile-card">
					<div class="profile-avatar" aria-hidden="true">AC</div>
					<h2 class="profile-name">Abderahmane Chaouche</h2>
					<p class="profile-role">
						{isFr
							? 'Apprenti Informaticien CFC — Exploitation & Infrastructure'
							: 'IT Apprentice (CFC) — Operations & Infrastructure'}
					</p>
					<div class="profile-badges">
						<span class="badge badge-sm">Infrastructure</span>
						<span class="badge badge-sm badge-violet">{isFr ? 'Virtualisation' : 'Virtualization'}</span>
						<span class="badge badge-sm badge-green">{isFr ? 'Cybersécurité' : 'Cybersecurity'}</span>
					</div>
				</div>

				<!-- Informations clés -->
				<div class="info-card">
					<p class="card-label">{isFr ? 'Informations' : 'Information'}</p>
					<ul class="info-list" role="list">
						<li class="info-item">
							<span class="info-icon" aria-hidden="true">📍</span>
							<div>
								<p class="info-key">{isFr ? 'Localisation' : 'Location'}</p>
								<p class="info-val">{isFr ? 'Nyon, Suisse (région genevoise)' : 'Nyon, Switzerland (Geneva area)'}</p>
							</div>
						</li>
						<li class="info-item">
							<span class="info-icon" aria-hidden="true">🏫</span>
							<div>
								<p class="info-key">{isFr ? 'École' : 'School'}</p>
								<p class="info-val">Geneva Institute of Technology</p>
							</div>
						</li>
						<li class="info-item">
							<span class="info-icon" aria-hidden="true">📚</span>
							<div>
								<p class="info-key">{isFr ? 'Formation' : 'Education'}</p>
								<p class="info-val">{isFr ? 'CFC Informaticien — Exploitation & Infrastructure (2024–2028)' : 'IT Apprenticeship (CFC) — Operations & Infrastructure (2024–2028)'}</p>
							</div>
						</li>
						<li class="info-item">
							<span class="info-icon" aria-hidden="true">💼</span>
							<div>
								<p class="info-key">{isFr ? 'Travail actuel' : 'Current job'}</p>
								<p class="info-val">{isFr ? 'Équipier — McDonald\'s Gland (depuis sept. 2025)' : "Crew Member — McDonald's Gland (since Sept. 2025)"}</p>
							</div>
						</li>
					</ul>
				</div>

				<!-- Disponibilité -->
				<div class="dispo-card">
					<span class="dispo-dot" aria-hidden="true"></span>
					<div>
						<strong>{isFr ? 'Disponible dès août 2026' : 'Available from August 2026'}</strong>
						<p>{isFr ? '3e & 4e année CFC en entreprise — Nyon / région genevoise' : '3rd & 4th year apprenticeship in company — Nyon / Geneva area'}</p>
					</div>
				</div>

				<!-- Certifications -->
				<div class="cert-card">
					<p class="card-label">{isFr ? 'Certifications' : 'Certifications'}</p>
					<ul class="cert-list" role="list">
						{#each certifications as cert}
							<li class="cert-item">
								<span class="cert-dot" style="background: {cert.color};"></span>
								<div>
									<p class="cert-name">{cert.name}</p>
									<p class="cert-meta">{cert.tag} · {isFr ? cert.dateFr : cert.dateEn}</p>
								</div>
							</li>
						{/each}
					</ul>
					<a
						href="https://www.credly.com/users/abderahmane-chaouche"
						target="_blank"
						rel="noopener noreferrer"
						class="credly-link"
					>
						{isFr ? 'Voir sur Credly →' : 'View on Credly →'}
					</a>
				</div>

				<!-- Centres d'intérêt -->
				<div class="interests-card">
					<p class="card-label">{isFr ? "Centres d'intérêt" : 'Interests'}</p>
					<div class="interests-tags">
						<span class="badge badge-sm badge-neutral">{isFr ? '🏋️ Street Workout' : '🏋️ Street Workout'}</span>
						<span class="badge badge-sm badge-neutral">{isFr ? '🔍 Veille techno' : '🔍 Tech Watch'}</span>
						<span class="badge badge-sm badge-neutral">{isFr ? '📚 Auto-formation' : '📚 Self-learning'}</span>
						<span class="badge badge-sm badge-neutral">{isFr ? '🎮 Gaming compétitif' : '🎮 Competitive Gaming'}</span>
					</div>
				</div>
			</div>

			<!-- RIGHT : Timeline -->
			<div class="about-right">
				<div class="section-header">
					<span class="section-label">{isFr ? 'Chronologie' : 'Timeline'}</span>
					<h2 class="section-title">Timeline</h2>
					<div class="section-divider"></div>
				</div>

				<div class="timeline-list" role="list">
					{#each timelineItems as item}
						<div class="timeline-item {item.highlight ? 'timeline-highlight' : ''}" role="listitem">
							<div class="timeline-icon" aria-hidden="true">{typeIcon[item.type]}</div>
							<div class="timeline-content">
								<p class="timeline-date">{isFr ? item.dateFr : item.dateEn}</p>
								<p class="timeline-title-text">{isFr ? item.titleFr : item.titleEn}</p>
								<p class="timeline-desc-text">{isFr ? item.descFr : item.descEn}</p>
							</div>
						</div>
					{/each}

					<!-- Items supplémentaires non dans la home -->
					<div class="timeline-item" role="listitem">
						<div class="timeline-icon" aria-hidden="true">💼</div>
						<div class="timeline-content">
							<p class="timeline-date">{isFr ? 'Juil.–Août 2023' : 'July–Aug. 2023'}</p>
							<p class="timeline-title-text">{isFr ? 'HES-SO — Auxiliaire viticulteur' : 'HES-SO — Vineyard assistant'}</p>
							<p class="timeline-desc-text">{isFr ? 'Récolte et entretien des vignes' : 'Grape harvest and vineyard maintenance'}</p>
						</div>
					</div>
					<div class="timeline-item" role="listitem">
						<div class="timeline-icon" aria-hidden="true">🎓</div>
						<div class="timeline-content">
							<p class="timeline-date">2022</p>
							<p class="timeline-title-text">{isFr ? 'Certificat fin de scolarité — VP OS (Maths-Physique)' : 'Compulsory education certificate — VP OS (Math-Physics)'}</p>
							<p class="timeline-desc-text">{isFr ? 'Voie Prégymnasiale, option Maths-Physique — Nyon' : 'Pre-gymnasium track, Math-Physics option — Nyon'}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Formation détail -->
	<section class="formation-section">
		<div class="container">
			<div class="section-header">
				<span class="section-label">{isFr ? 'Formation' : 'Education'}</span>
				<h2 class="section-title">{isFr ? 'CFC Informaticien' : 'IT Apprenticeship (CFC)'}</h2>
				<div class="section-divider"></div>
			</div>
			<div class="formation-grid">
				<div class="formation-card">
					<h3 class="formation-title">
						{isFr ? 'CFC Informaticien — Exploitation & Infrastructure' : 'IT Apprenticeship (CFC) — Operations & Infrastructure'}
					</h3>
					<p class="formation-meta">Geneva Institute of Technology | {isFr ? '2024–2028 (en cours)' : '2024–2028 (ongoing)'}</p>
					<ul class="formation-list" role="list">
						<li>{isFr ? '2 ans en école à plein temps (1re et 2e années)' : '2 years of full-time school (1st and 2nd years)'}</li>
						<li>{isFr ? 'Passage en entreprise dès la 3e année (dès août 2026)' : 'Company placement from the 3rd year (from August 2026)'}</li>
						<li>{isFr ? 'Modules : systèmes d\'exploitation, réseaux, virtualisation, cybersécurité, algorithmique' : 'Modules: operating systems, networking, virtualization, cybersecurity, algorithms'}</li>
						<li>{isFr ? '4 hackathons complétés dans le cadre de la formation' : '4 hackathons completed as part of the training'}</li>
					</ul>
				</div>
				<div class="formation-card">
					<h3 class="formation-title">
						{isFr ? 'Certificat fin de scolarité — VP OS' : 'Compulsory education certificate — VP OS'}
					</h3>
					<p class="formation-meta">Nyon | 2022</p>
					<ul class="formation-list" role="list">
						<li>{isFr ? 'Voie Prégymnasiale (VP) — niveau exigeant' : 'Pre-gymnasium track (VP) — advanced level'}</li>
						<li>{isFr ? 'Option spécifique : Maths-Physique (OS)' : 'Specific option: Math-Physics (OS)'}</li>
						<li>{isFr ? 'Base solide en raisonnement logique et sciences' : 'Strong foundation in logical reasoning and sciences'}</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="about-cta">
		<div class="container about-cta-inner">
			<h2>{isFr ? 'Ces compétences correspondent à vos besoins ?' : 'Do these skills match your needs?'}</h2>
			<p>{isFr ? 'Disponible dès août 2026 — Nyon, région genevoise.' : 'Available from August 2026 — Nyon, Geneva area.'}</p>
			<div class="cta-buttons">
				<a href="{base}/contact" class="btn btn-primary">{isFr ? 'Me contacter' : 'Contact me'}</a>
				<a href="{base}/skills" class="btn btn-secondary">{isFr ? 'Voir mes compétences' : 'View my skills'}</a>
			</div>
		</div>
	</section>

</main>

<style>
	.about-section {
		padding: var(--sp-12) 0 var(--sp-20);
	}

	.about-grid {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: var(--sp-12);
		align-items: start;
	}

	/* ── LEFT ── */
	.about-left {
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
		position: sticky;
		top: calc(var(--nav-height) + var(--sp-6));
	}

	.profile-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--sp-6);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-3);
		text-align: center;
	}

	.profile-avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--bg-base);
	}

	.profile-name {
		font-family: var(--font-display);
		font-size: var(--fs-base);
		font-weight: 700;
		color: var(--text-primary);
	}

	.profile-role {
		font-size: var(--fs-sm);
		color: var(--text-muted);
		line-height: 1.4;
	}

	.profile-badges {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-1);
		justify-content: center;
	}

	/* Shared card style */
	.info-card,
	.cert-card,
	.interests-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--sp-5);
	}

	.card-label {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-dim);
		margin-bottom: var(--sp-3);
	}

	/* Info list */
	.info-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
	}

	.info-item {
		display: flex;
		gap: var(--sp-3);
		align-items: flex-start;
	}

	.info-icon {
		font-size: 1rem;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.info-key {
		font-size: var(--fs-xs);
		color: var(--text-dim);
		margin-bottom: 2px;
	}

	.info-val {
		font-size: var(--fs-sm);
		color: var(--text-secondary);
		font-weight: 500;
		line-height: 1.4;
	}

	/* Dispo */
	.dispo-card {
		display: flex;
		gap: var(--sp-3);
		align-items: flex-start;
		padding: var(--sp-4);
		background: color-mix(in srgb, var(--accent-green) 6%, var(--bg-secondary));
		border: 1px solid color-mix(in srgb, var(--accent-green) 30%, transparent);
		border-radius: var(--radius-lg);
	}

	.dispo-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--accent-green);
		flex-shrink: 0;
		margin-top: 4px;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.dispo-card strong {
		display: block;
		font-size: var(--fs-sm);
		color: var(--accent-green);
		margin-bottom: var(--sp-1);
	}

	.dispo-card p {
		font-size: var(--fs-xs);
		color: var(--text-muted);
	}

	/* Cert list */
	.cert-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
		margin-bottom: var(--sp-3);
	}

	.cert-item {
		display: flex;
		gap: var(--sp-3);
		align-items: center;
	}

	.cert-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.cert-name {
		font-size: var(--fs-sm);
		font-weight: 600;
		color: var(--text-primary);
	}

	.cert-meta {
		font-size: var(--fs-xs);
		color: var(--text-dim);
	}

	.credly-link {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		color: var(--accent-cyan);
		text-decoration: none;
	}

	.credly-link:hover { opacity: 0.7; }

	/* Interests */
	.interests-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-2);
	}

	/* ── RIGHT : Timeline ── */
	.about-right {
		padding-top: var(--sp-2);
	}

	.section-divider {
		width: 40px;
		height: 2px;
		background: var(--accent-cyan);
		margin-top: var(--sp-3);
		opacity: 0.5;
	}

	.timeline-list {
		position: relative;
		display: flex;
		flex-direction: column;
		margin-top: var(--sp-8);
	}

	.timeline-list::before {
		content: '';
		position: absolute;
		left: 19px;
		top: 8px;
		bottom: 8px;
		width: 1px;
		background: linear-gradient(to bottom, var(--accent-cyan), color-mix(in srgb, var(--accent-violet) 60%, transparent), transparent);
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: var(--sp-4);
		padding: var(--sp-4) 0;
	}

	.timeline-item + .timeline-item {
		border-top: 1px solid var(--border);
	}

	.timeline-highlight {
		background: color-mix(in srgb, var(--accent-cyan) 4%, transparent);
		border: 1px solid color-mix(in srgb, var(--accent-cyan) 20%, transparent) !important;
		border-radius: var(--radius-md);
		padding: var(--sp-4) var(--sp-3);
		margin: var(--sp-2) 0;
	}

	.timeline-highlight + .timeline-item,
	.timeline-item + .timeline-highlight {
		border-top: none;
	}

	.timeline-icon {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid var(--border);
		background: var(--bg-base);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		flex-shrink: 0;
		position: relative;
		z-index: 1;
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
	}

	.timeline-highlight .timeline-date { color: var(--accent-cyan); }

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

	/* ── Formation ── */
	.formation-section {
		padding: var(--sp-16) 0;
		background: var(--bg-secondary);
		border-top: 1px solid var(--border);
	}

	.formation-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--sp-6);
		margin-top: var(--sp-8);
	}

	.formation-card {
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--sp-6);
	}

	.formation-title {
		font-size: var(--fs-base);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--sp-2);
		line-height: 1.3;
	}

	.formation-meta {
		font-size: var(--fs-sm);
		color: var(--text-muted);
		margin-bottom: var(--sp-4);
	}

	.formation-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--sp-2);
	}

	.formation-list li {
		font-size: var(--fs-sm);
		color: var(--text-secondary);
		padding-left: var(--sp-4);
		position: relative;
		line-height: 1.5;
	}

	.formation-list li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: var(--accent-cyan);
		opacity: 0.6;
	}

	/* ── CTA ── */
	.about-cta {
		padding: var(--sp-16) 0;
		border-top: 1px solid var(--border);
		text-align: center;
	}

	.about-cta-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-4);
	}

	.about-cta h2 {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 800;
		color: var(--text-primary);
	}

	.about-cta p {
		color: var(--text-muted);
	}

	.cta-buttons {
		display: flex;
		gap: var(--sp-4);
		flex-wrap: wrap;
		justify-content: center;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.about-grid {
			grid-template-columns: 1fr;
		}

		.about-left {
			position: static;
		}
	}

	@media (max-width: 640px) {
		.formation-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dispo-dot { animation: none; }
	}
</style>
