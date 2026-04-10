<!-- /skills — Dashboard des 6 catégories de compétences avec niveaux -->
<script lang="ts">
	import { base } from '$app/paths';
	import { langStore } from '$lib/stores/lang.svelte';
	import { skillCategories, type SkillLevel } from '$lib/data/skills';

	const isFr = $derived(langStore.isFr);

	function levelLabel(level: SkillLevel, fr: boolean): string {
		if (level === 'confident') return fr ? 'Confiant' : 'Confident';
		if (level === 'intermediate') return fr ? 'Intermédiaire' : 'Intermediate';
		return fr ? 'Débutant' : 'Beginner';
	}

	function levelWidth(level: SkillLevel): number {
		if (level === 'confident') return 85;
		if (level === 'intermediate') return 55;
		return 25;
	}

	function levelColor(level: SkillLevel): string {
		if (level === 'confident') return 'var(--accent-cyan)';
		if (level === 'intermediate') return 'var(--accent-violet)';
		return 'var(--accent-green)';
	}

	const certifications = [
		{ name: 'Fortinet FCF', tagFr: 'Cybersécurité', tagEn: 'Cybersecurity', date: 'Mars 2026', color: '#10d9a0', href: 'https://www.credly.com/users/abderahmane-chaouche' },
		{ name: 'Cisco Cybersecurity', tagFr: 'Networking Academy', tagEn: 'Networking Academy', date: 'Mars 2026', color: '#4f8ef7', href: 'https://www.credly.com/users/abderahmane-chaouche' },
		{ name: 'Azure AI Essentials', tagFr: 'Microsoft', tagEn: 'Microsoft', date: 'Mars 2026', color: '#0078d4', href: 'https://www.credly.com/users/abderahmane-chaouche' }
	];

	const languages = [
		{ flag: '🇫🇷', nameFr: 'Français', nameEn: 'French', levelFr: 'Langue maternelle — C2', levelEn: 'Native language — C2' },
		{ flag: '🇬🇧', nameFr: 'Anglais', nameEn: 'English', levelFr: 'B1 — Lecture tech + communication basique', levelEn: 'B1 — Tech reading + basic communication' },
		{ flag: '🇩🇪', nameFr: 'Allemand', nameEn: 'German', levelFr: 'A2 — Notions de base', levelEn: 'A2 — Basic knowledge' }
	];
</script>

<svelte:head>
	<title>{isFr ? 'Compétences — Abderahmane Chaouche' : 'Skills — Abderahmane Chaouche'}</title>
	<meta
		name="description"
		content={isFr
			? 'Compétences IT : systèmes Windows/Linux, VMware ESXi, réseau CCNA, SIEM Wazuh, développement Python/PHP/JS.'
			: 'IT skills: Windows/Linux systems, VMware ESXi, CCNA networking, Wazuh SIEM, Python/PHP/JS development.'}
	/>
</svelte:head>

<main id="main-content" class="page-content">

	<!-- Page Header -->
	<div class="page-header">
		<div class="container">
			<span class="section-label">{isFr ? 'Profil technique' : 'Technical Profile'}</span>
			<h1 class="section-title">{isFr ? 'Compétences' : 'Skills'}</h1>
			<p class="section-desc">
				{isFr
					? 'Niveaux basés sur la pratique réelle — cours, labs, projets et hackathons.'
					: 'Levels based on real practice — courses, labs, projects and hackathons.'}
				<br />
				{isFr
					? 'Débutant = notions acquises · Intermédiaire = utilisé en projet · Confiant = autonome'
					: 'Beginner = basics acquired · Intermediate = used in a project · Confident = autonomous'}
			</p>
		</div>
	</div>

	<!-- Skills grid -->
	<section class="skills-section">
		<div class="container">
			<div class="skills-grid">
				{#each skillCategories as cat}
					<div class="skill-cat">
						<h2 class="skill-cat-title">
							<span aria-hidden="true">{cat.icon}</span>
							{isFr ? cat.titleFr : cat.titleEn}
						</h2>
						<ul class="skill-list" role="list">
							{#each cat.skills as skill}
								<li class="skill-item">
									<div class="skill-row">
										<span class="skill-name">{isFr ? skill.nameFr : skill.nameEn}</span>
										<span
											class="skill-badge"
											style="color: {levelColor(skill.level)}; border-color: {levelColor(skill.level)}40;"
										>
											{levelLabel(skill.level, isFr)}
										</span>
									</div>
									<div class="skill-bar-bg" role="progressbar" aria-label="{isFr ? skill.nameFr : skill.nameEn}: {levelLabel(skill.level, isFr)}" aria-valuenow={levelWidth(skill.level)} aria-valuemin={0} aria-valuemax={100}>
										<div
											class="skill-bar-fill"
											style="width: {levelWidth(skill.level)}%; background: {levelColor(skill.level)};"
										></div>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Certifications -->
	<section class="certs-section">
		<div class="container">
			<div class="section-header">
				<span class="section-label">{isFr ? 'Badges officiels' : 'Official badges'}</span>
				<h2 class="section-title">{isFr ? 'Certifications' : 'Certifications'}</h2>
				<div class="section-divider"></div>
			</div>
			<div class="certs-grid">
				{#each certifications as cert}
					<a href={cert.href} target="_blank" rel="noopener noreferrer" class="cert-card">
						<div class="cert-dot-large" style="background: {cert.color};"></div>
						<div>
							<p class="cert-name">{cert.name}</p>
							<p class="cert-meta">{isFr ? cert.tagFr : cert.tagEn} · {cert.date}</p>
						</div>
						<span class="cert-arrow" aria-hidden="true">↗</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Langues -->
	<section class="languages-section">
		<div class="container">
			<div class="section-header">
				<span class="section-label">{isFr ? 'Communication' : 'Communication'}</span>
				<h2 class="section-title">{isFr ? 'Langues' : 'Languages'}</h2>
				<div class="section-divider"></div>
			</div>
			<div class="languages-grid">
				{#each languages as lang}
					<div class="language-card">
						<span class="lang-flag" aria-hidden="true">{lang.flag}</span>
						<p class="lang-name">{isFr ? lang.nameFr : lang.nameEn}</p>
						<p class="lang-level">{isFr ? lang.levelFr : lang.levelEn}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Légende -->
	<section class="legend-section">
		<div class="container">
			<div class="legend-box">
				<p class="legend-title">{isFr ? 'Explication des niveaux' : 'Level explanation'}</p>
				<div class="legend-items">
					<div class="legend-item">
						<span class="legend-badge" style="color: var(--accent-green); border-color: var(--accent-green)40;">{isFr ? 'Débutant' : 'Beginner'}</span>
						<p>{isFr ? 'Notions acquises en cours — utilisé ponctuellement, besoin de documentation.' : 'Basics acquired in class — used occasionally, needs documentation.'}</p>
					</div>
					<div class="legend-item">
						<span class="legend-badge" style="color: var(--accent-violet); border-color: var(--accent-violet)40;">{isFr ? 'Intermédiaire' : 'Intermediate'}</span>
						<p>{isFr ? 'Utilisé en projet ou hackathon — capable de travailler dessus avec quelques recherches.' : 'Used in a project or hackathon — able to work with it with some research.'}</p>
					</div>
					<div class="legend-item">
						<span class="legend-badge" style="color: var(--accent-cyan); border-color: var(--accent-cyan)40;">{isFr ? 'Confiant' : 'Confident'}</span>
						<p>{isFr ? "À l'aise en autonomie — capable d'exécuter sans aide sur les cas courants." : 'Comfortable independently — able to execute without help on common cases.'}</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="skills-cta">
		<div class="container skills-cta-inner">
			<h2>{isFr ? 'Ces compétences correspondent à vos besoins ?' : 'Do these skills match your needs?'}</h2>
			<p>{isFr ? 'Disponible dès août 2026 — Nyon, région genevoise.' : 'Available from August 2026 — Nyon, Geneva area.'}</p>
			<div class="cta-buttons">
				<a href="{base}/contact" class="btn btn-primary">{isFr ? 'Me contacter' : 'Contact me'}</a>
				<a href="{base}/projects" class="btn btn-secondary">{isFr ? 'Voir mes projets' : 'View my projects'}</a>
			</div>
		</div>
	</section>

</main>

<style>
	/* Skills grid */
	.skills-section {
		padding: var(--sp-12) 0 var(--sp-16);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--sp-6);
	}

	.skill-cat {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--sp-6);
	}

	.skill-cat-title {
		display: flex;
		align-items: center;
		gap: var(--sp-2);
		font-size: var(--fs-base);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--sp-5);
	}

	.skill-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
	}

	.skill-item {
		display: flex;
		flex-direction: column;
		gap: var(--sp-2);
	}

	.skill-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--sp-2);
	}

	.skill-name {
		font-size: var(--fs-sm);
		color: var(--text-secondary);
		line-height: 1.3;
	}

	.skill-badge {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		padding: 2px 8px;
		border-radius: 4px;
		border: 1px solid;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.skill-bar-bg {
		height: 3px;
		background: var(--border);
		border-radius: 2px;
		overflow: hidden;
	}

	.skill-bar-fill {
		height: 100%;
		border-radius: 2px;
		transition: width 0.8s var(--ease-smooth);
	}

	/* Certifications */
	.certs-section {
		padding: var(--sp-16) 0;
		background: var(--bg-secondary);
		border-top: 1px solid var(--border);
	}

	.certs-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--sp-4);
		margin-top: var(--sp-8);
	}

	.cert-card {
		display: flex;
		align-items: center;
		gap: var(--sp-4);
		padding: var(--sp-5);
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: border-color var(--ease-smooth), transform var(--ease-smooth);
	}

	.cert-card:hover {
		border-color: var(--accent-cyan);
		transform: translateY(-2px);
	}

	.cert-dot-large {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.cert-name {
		font-size: var(--fs-sm);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 2px;
	}

	.cert-meta {
		font-size: var(--fs-xs);
		color: var(--text-dim);
	}

	.cert-arrow {
		margin-left: auto;
		color: var(--text-dim);
		font-size: 0.9rem;
	}

	/* Languages */
	.languages-section {
		padding: var(--sp-16) 0;
	}

	.languages-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--sp-4);
		margin-top: var(--sp-8);
	}

	.language-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--sp-5);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-2);
		text-align: center;
	}

	.lang-flag { font-size: 2rem; }

	.lang-name {
		font-size: var(--fs-base);
		font-weight: 600;
		color: var(--text-primary);
	}

	.lang-level {
		font-size: var(--fs-sm);
		color: var(--text-muted);
	}

	/* Légende */
	.legend-section {
		padding: var(--sp-12) 0;
		background: var(--bg-secondary);
		border-top: 1px solid var(--border);
	}

	.legend-box {
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
	}

	.legend-title {
		font-size: var(--fs-sm);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--sp-5);
	}

	.legend-items {
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
		text-align: left;
	}

	.legend-item {
		display: flex;
		align-items: flex-start;
		gap: var(--sp-4);
	}

	.legend-badge {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		padding: 3px 10px;
		border-radius: 4px;
		border: 1px solid;
		white-space: nowrap;
		flex-shrink: 0;
		min-width: 90px;
		text-align: center;
	}

	.legend-item p {
		font-size: var(--fs-sm);
		color: var(--text-muted);
		line-height: 1.5;
	}

	/* CTA */
	.skills-cta {
		padding: var(--sp-16) 0;
		border-top: 1px solid var(--border);
		text-align: center;
	}

	.skills-cta-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-4);
	}

	.skills-cta h2 {
		font-family: var(--font-display);
		font-size: clamp(1.4rem, 3vw, 1.75rem);
		font-weight: 800;
		color: var(--text-primary);
	}

	.skills-cta p { color: var(--text-muted); }

	.cta-buttons {
		display: flex;
		gap: var(--sp-4);
		flex-wrap: wrap;
		justify-content: center;
	}

	.section-divider {
		width: 40px;
		height: 2px;
		background: var(--accent-cyan);
		margin-top: var(--sp-3);
		opacity: 0.5;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.skills-grid,
		.certs-grid,
		.languages-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.certs-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
