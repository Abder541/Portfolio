<!-- /contact — Formulaire EmailJS + infos de contact + zone de mobilité -->
<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { langStore } from '$lib/stores/lang.svelte';
	import { onMount } from 'svelte';

	const isFr = $derived(langStore.isFr);

	// EmailJS config (identiques à l'ancien portfolio)
	const EMAILJS_PUBLIC_KEY = 'HON15hJQozaIn-hwA';
	const EMAILJS_SERVICE_ID = 'service_g71zdau';
	const EMAILJS_TEMPLATE_ID = 'template_cn68z2c';

	// Form state
	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let honeypot = $state('');
	let isSubmitting = $state(false);
	let status = $state<'idle' | 'success' | 'error'>('idle');

	// Terminal animation — chaque ligne peut contenir un lien cliquable
	type TerminalLine = {
		text: string;
		kind: 'cmd' | 'output';
		label?: string;
		url?: string;
	};

	let terminalLines = $state<TerminalLine[]>([]);
	const terminalSequence: TerminalLine[] = [
		{ text: '> ssh abderahmane@portfolio.local', kind: 'cmd' },
		{ text: 'Connected. Welcome back.', kind: 'output' },
		{ text: '> cat contact.txt', kind: 'cmd' },
		{
			text: 'LinkedIn : ',
			kind: 'output',
			label: 'linkedin.com/in/abderahmanechaouche',
			url: 'https://www.linkedin.com/in/abderahmanechaouche'
		},
		{
			text: 'GitHub   : ',
			kind: 'output',
			label: 'github.com/Abder541',
			url: 'https://github.com/Abder541'
		},
		{
			text: 'Credly   : ',
			kind: 'output',
			label: 'credly.com/users/abderahmane-chaouche',
			url: 'https://www.credly.com/users/abderahmane-chaouche'
		},
		{ text: 'Dispo    : août 2026', kind: 'output' },
		{ text: '> _', kind: 'cmd' }
	];

	onMount(() => {
		let i = 0;
		const interval = setInterval(() => {
			if (i < terminalSequence.length) {
				terminalLines = [...terminalLines, terminalSequence[i]];
				i++;
			} else {
				clearInterval(interval);
			}
		}, 380);
		return () => clearInterval(interval);
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (honeypot) return; // anti-spam
		if (!name || !email || !message) return;

		isSubmitting = true;
		status = 'idle';

		try {
			if (!browser) return;
			// Lazy-load EmailJS (pas de SSR)
			const emailjs = (await import('@emailjs/browser')).default;
			emailjs.init(EMAILJS_PUBLIC_KEY);

			await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
				from_name: name,
				from_email: email,
				subject: subject || (isFr ? 'Contact portfolio' : 'Portfolio contact'),
				message
			});
			status = 'success';
			name = '';
			email = '';
			subject = '';
			message = '';
		} catch {
			status = 'error';
		} finally {
			isSubmitting = false;
		}
	}

	const contactLinks = [
		{
			icon: 'linkedin',
			label: 'LinkedIn',
			value: 'abderahmane-chaouche',
			href: 'https://www.linkedin.com/in/abderahmanechaouche'
		},
		{
			icon: 'github',
			label: 'GitHub',
			value: 'github.com/Abder541',
			href: 'https://github.com/Abder541'
		},
		{
			icon: 'credly',
			label: 'Credly',
			valueFr: 'Badges & Certifications',
			valueEn: 'Badges & Certifications',
			href: 'https://www.credly.com/users/abderahmane-chaouche'
		}
	];

	const recruiterInfoFr = [
		"Place d'apprentissage pour les 3e et 4e années CFC Informaticien",
		'Spécialisation : Exploitation & Infrastructure',
		'Disponibilité : dès août 2026',
		'Localisation : Nyon et région genevoise',
		'Domaines : systèmes, infrastructure, réseau, cybersécurité'
	];

	const recruiterInfoEn = [
		'Apprenticeship for the 3rd and 4th years of IT CFC',
		'Specialization: Operations & Infrastructure',
		'Availability: from August 2026',
		'Location: Nyon and Geneva area',
		'Fields: systems, infrastructure, networking, cybersecurity'
	];

	const apportFr = [
		'2 ans de formation théorique solide au GIT',
		'4 hackathons techniques : cybersécurité, IoT, infrastructure, No Code',
		'Lab VMware ESXi opérationnel + SIEM Wazuh déployé',
		"Expérience en travail autonome (McDonald's en parallèle du CFC)",
		'Curieux, rigoureux, habitué à apprendre vite'
	];

	const apportEn = [
		'2 years of solid theoretical training at GIT',
		'4 technical hackathons: cybersecurity, IoT, infrastructure, No Code',
		'Operational VMware ESXi lab + Wazuh SIEM deployed',
		"Experience in autonomous work (McDonald's alongside CFC)",
		'Curious, thorough, accustomed to learning quickly'
	];
</script>

<svelte:head>
	<title>{isFr ? 'Contact — Abderahmane Chaouche' : 'Contact — Abderahmane Chaouche'}</title>
	<meta
		name="description"
		content={isFr
			? 'Contacter Abderahmane Chaouche — Apprenti Informaticien CFC, Nyon. Disponible pour apprentissage dès août 2026.'
			: 'Contact Abderahmane Chaouche — IT Apprentice CFC, Nyon. Available for apprenticeship from August 2026.'}
	/>
</svelte:head>

<main id="main-content" class="page-content">

	<!-- Page Header -->
	<div class="page-header">
		<div class="container">
			<span class="section-label">{isFr ? 'Recrutement' : 'Recruitment'}</span>
			<h1 class="section-title">{isFr ? 'Me contacter' : 'Contact me'}</h1>
			<p class="section-desc">
				{isFr
					? 'Vous cherchez un apprenti pour les 3e et 4e années CFC dès août 2026 ?'
					: 'Looking for an apprentice for the 3rd and 4th CFC years starting August 2026?'}
				<br />
				{isFr
					? 'Contactez-moi via LinkedIn ou utilisez le formulaire ci-dessous.'
					: 'Contact me via LinkedIn or use the form below.'}
			</p>
		</div>
	</div>

	<!-- Section principale -->
	<section id="contact-form" class="contact-section">
		<div class="container">

			<!-- Badge dispo -->
			<div class="dispo-card">
				<span class="dispo-dot" aria-hidden="true"></span>
				<div>
					<strong>{isFr ? 'Disponible dès août 2026' : 'Available from August 2026'}</strong>
					<span>{isFr ? '3e & 4e année CFC Informaticien' : '3rd & 4th year IT apprenticeship'}</span>
					<br />
					<span class="dispo-location">{isFr ? 'Nyon, Suisse — Mobilité région genevoise' : 'Nyon, Switzerland — Mobility Geneva area'}</span>
				</div>
			</div>

			<div class="contact-grid">

				<!-- LEFT : liens + terminal -->
				<div class="contact-left">
					<h2 class="contact-subtitle">{isFr ? 'Contact direct' : 'Direct contact'}</h2>
					<p class="contact-subdesc">
						{isFr ? 'Ces canaux sont les plus rapides pour me joindre.' : 'These channels are the fastest way to reach me.'}
					</p>

					<!-- Liens -->
					<div class="contact-links">
						{#each contactLinks as link}
							<a href={link.href} target="_blank" rel="noopener noreferrer" class="contact-link-card">
								<span class="contact-link-icon" aria-hidden="true">
									{#if link.icon === 'linkedin'}💼
									{:else if link.icon === 'github'}🐙
									{:else}🏅
									{/if}
								</span>
								<div>
									<p class="contact-link-label">{link.label}</p>
									<p class="contact-link-value">{'valueFr' in link ? (isFr ? link.valueFr : link.valueEn) : link.value}</p>
								</div>
								<span class="link-arrow" aria-hidden="true">↗</span>
							</a>
						{/each}
					</div>

					<!-- Terminal animé -->
					<div class="terminal" aria-label="Terminal — infos de contact" role="region">
						<div class="terminal-header" aria-hidden="true">
							<span class="terminal-dot t-red"></span>
							<span class="terminal-dot t-yellow"></span>
							<span class="terminal-dot t-green"></span>
							<span class="terminal-title">contact.sh</span>
						</div>
						<div class="terminal-body">
							{#each terminalLines as line}
								<p class="terminal-line {line.kind === 'cmd' ? 'terminal-cmd' : 'terminal-output'}">
									{line.text}{#if line.url}<a
											href={line.url}
											target="_blank"
											rel="noopener noreferrer"
											class="terminal-link"
										>{line.label}</a>{/if}
								</p>
							{/each}
						</div>
					</div>
				</div>

				<!-- RIGHT : formulaire -->
				<div class="contact-right">
					<h2 class="contact-subtitle">{isFr ? 'Formulaire de contact' : 'Contact form'}</h2>
					<p class="contact-subdesc">
						{isFr
							? 'Envoyez-moi un message directement — je réponds généralement sous 24 h.'
							: 'Send me a message directly — I usually reply within 24 hours.'}
					</p>

					<form onsubmit={handleSubmit} novalidate aria-label={isFr ? 'Formulaire de contact' : 'Contact form'}>
						<!-- Honeypot anti-spam -->
						<div class="honeypot" aria-hidden="true">
							<label for="website">Ne pas remplir</label>
							<input type="text" id="website" name="website" bind:value={honeypot} tabindex="-1" autocomplete="off" />
						</div>

						<div class="form-group">
							<label class="form-label" for="contact-name">
								{isFr ? 'Nom / Prénom' : 'Name'} <span aria-hidden="true">*</span>
							</label>
							<input
								type="text"
								id="contact-name"
								name="name"
								class="form-input"
								placeholder={isFr ? 'Votre nom' : 'Your name'}
								required
								autocomplete="name"
								aria-required="true"
								bind:value={name}
							/>
						</div>

						<div class="form-group">
							<label class="form-label" for="contact-email">
								{isFr ? 'Adresse e-mail' : 'Email address'} <span aria-hidden="true">*</span>
							</label>
							<input
								type="email"
								id="contact-email"
								name="email"
								class="form-input"
								placeholder={isFr ? 'vous@entreprise.ch' : 'you@company.com'}
								required
								autocomplete="email"
								aria-required="true"
								bind:value={email}
							/>
						</div>

						<div class="form-group">
							<label class="form-label" for="contact-subject">{isFr ? 'Sujet' : 'Subject'}</label>
							<input
								type="text"
								id="contact-subject"
								name="subject"
								class="form-input"
								placeholder={isFr ? "Offre d'apprentissage — Nom de l'entreprise" : 'Apprenticeship offer — Company name'}
								autocomplete="off"
								bind:value={subject}
							/>
						</div>

						<div class="form-group">
							<label class="form-label" for="contact-message">
								{isFr ? 'Message' : 'Message'} <span aria-hidden="true">*</span>
							</label>
							<textarea
								id="contact-message"
								name="message"
								class="form-textarea"
								placeholder={isFr ? 'Décrivez votre offre, le poste, l\'entreprise…' : 'Describe your offer, the position, the company…'}
								required
								aria-required="true"
								rows="5"
								bind:value={message}
							></textarea>
						</div>

						<button
							type="submit"
							class="btn btn-primary submit-btn"
							disabled={isSubmitting}
							aria-busy={isSubmitting}
						>
							{#if isSubmitting}
								<span class="spinner" aria-hidden="true"></span>
								{isFr ? 'Envoi en cours…' : 'Sending…'}
							{:else}
								{isFr ? 'Envoyer le message →' : 'Send message →'}
							{/if}
						</button>
					</form>

					{#if status === 'success'}
						<div class="form-feedback form-success" role="alert">
							✓ {isFr ? 'Message envoyé avec succès — je vous répondrai sous 24 h.' : 'Message sent successfully — I will reply within 24 hours.'}
						</div>
					{/if}
					{#if status === 'error'}
						<div class="form-feedback form-error" role="alert">
							✗ {isFr ? 'Une erreur s\'est produite. Veuillez réessayer ou me contacter via LinkedIn.' : 'An error occurred. Please try again or contact me via LinkedIn.'}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Section recruteur -->
	<section class="recruiter-section">
		<div class="container recruiter-grid">
			<div class="recruiter-block">
				<h2>{isFr ? 'Ce que je cherche' : "What I'm looking for"}</h2>
				<ul class="recruiter-list" role="list">
					{#each (isFr ? recruiterInfoFr : recruiterInfoEn) as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
			<div class="recruiter-block">
				<h2>{isFr ? "Ce que j'apporte" : 'What I bring'}</h2>
				<ul class="recruiter-list" role="list">
					{#each (isFr ? apportFr : apportEn) as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

</main>

<style>
	/* Dispo */
	.contact-section {
		padding: var(--sp-12) 0 var(--sp-20);
	}

	.dispo-card {
		display: flex;
		gap: var(--sp-3);
		align-items: flex-start;
		padding: var(--sp-4) var(--sp-5);
		background: color-mix(in srgb, var(--accent-green) 6%, var(--bg-secondary));
		border: 1px solid color-mix(in srgb, var(--accent-green) 30%, transparent);
		border-radius: var(--radius-lg);
		margin-bottom: var(--sp-10);
		max-width: 560px;
	}

	.dispo-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--accent-green);
		flex-shrink: 0;
		margin-top: 5px;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.dispo-card strong {
		display: inline;
		font-size: var(--fs-sm);
		color: var(--accent-green);
		margin-right: var(--sp-2);
	}

	.dispo-card span {
		font-size: var(--fs-sm);
		color: var(--text-secondary);
	}

	.dispo-location {
		font-size: var(--fs-xs) !important;
		color: var(--text-muted) !important;
	}

	/* Grid */
	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--sp-12);
		align-items: start;
	}

	/* LEFT */
	.contact-subtitle {
		font-size: var(--fs-base);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--sp-1);
	}

	.contact-subdesc {
		font-size: var(--fs-sm);
		color: var(--text-muted);
		margin-bottom: var(--sp-5);
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
		margin-bottom: var(--sp-6);
	}

	.contact-link-card {
		display: flex;
		align-items: center;
		gap: var(--sp-3);
		padding: var(--sp-4);
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: border-color var(--ease-smooth);
	}

	.contact-link-card:hover { border-color: var(--accent-cyan); }

	.contact-link-icon { font-size: 1.2rem; flex-shrink: 0; }

	.contact-link-label {
		font-size: var(--fs-sm);
		font-weight: 600;
		color: var(--text-primary);
	}

	.contact-link-value {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		color: var(--text-dim);
	}

	.link-arrow {
		margin-left: auto;
		color: var(--text-dim);
	}

	/* Terminal */
	.terminal {
		background: var(--terminal-bg);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		font-family: var(--font-mono);
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: var(--sp-2);
		padding: var(--sp-3) var(--sp-4);
		background: color-mix(in srgb, var(--accent-cyan) 6%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--accent-cyan) 15%, transparent);
	}

	.terminal-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.t-red { background: #ff5f57; }
	.t-yellow { background: #febc2e; }
	.t-green { background: #28c840; }

	.terminal-title {
		font-size: var(--fs-xs);
		color: var(--text-dim);
		margin-left: var(--sp-2);
	}

	.terminal-body {
		padding: var(--sp-4);
		min-height: 160px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.terminal-line {
		font-size: var(--fs-xs);
		line-height: 1.7;
	}

	.terminal-cmd { color: var(--accent-cyan); }
	.terminal-output { color: color-mix(in srgb, var(--text-muted) 80%, transparent); }

	.terminal-link {
		color: var(--accent-cyan);
		text-decoration: none;
		border-bottom: 1px dashed color-mix(in srgb, var(--accent-cyan) 40%, transparent);
		transition: color var(--ease-quick), border-color var(--ease-quick);
	}

	.terminal-link:hover {
		color: var(--text-primary);
		border-bottom-color: var(--text-primary);
	}

	/* Form */
	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--sp-2);
		margin-bottom: var(--sp-4);
	}

	.form-label {
		font-size: var(--fs-sm);
		font-weight: 600;
		color: var(--text-secondary);
	}

	.form-label span { color: var(--accent-cyan); }

	.form-input,
	.form-textarea {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: var(--sp-3) var(--sp-4);
		color: var(--text-primary);
		font-family: var(--font-sans, inherit);
		font-size: var(--fs-sm);
		transition: border-color var(--ease-quick);
		width: 100%;
		box-sizing: border-box;
	}

	.form-input:focus,
	.form-textarea:focus {
		outline: none;
		border-color: var(--accent-cyan);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-cyan) 20%, transparent);
	}

	.form-textarea { resize: vertical; min-height: 120px; }

	.submit-btn {
		width: 100%;
		justify-content: center;
		display: flex;
		align-items: center;
		gap: var(--sp-2);
	}

	.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

	.spinner {
		width: 14px;
		height: 14px;
		border: 2px solid transparent;
		border-top-color: currentColor;
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin { to { transform: rotate(360deg); } }

	.form-feedback {
		margin-top: var(--sp-4);
		padding: var(--sp-3) var(--sp-4);
		border-radius: var(--radius-md);
		font-size: var(--fs-sm);
		border: 1px solid;
	}

	.form-success {
		background: color-mix(in srgb, var(--accent-green) 10%, transparent);
		border-color: color-mix(in srgb, var(--accent-green) 35%, transparent);
		color: var(--accent-green);
	}

	.form-error {
		background: rgba(239, 68, 68, 0.1);
		border-color: rgba(239, 68, 68, 0.3);
		color: #f87171;
	}

	.honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	/* Recruiter section */
	.recruiter-section {
		padding: var(--sp-16) 0;
		background: var(--bg-secondary);
		border-top: 1px solid var(--border);
	}

	.recruiter-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--sp-10);
	}

	.recruiter-block h2 {
		font-size: var(--fs-base);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--sp-4);
	}

	.recruiter-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--sp-3);
	}

	.recruiter-list li {
		font-size: var(--fs-sm);
		color: var(--text-secondary);
		padding-left: var(--sp-4);
		position: relative;
		line-height: 1.5;
	}

	.recruiter-list li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: var(--accent-cyan);
		opacity: 0.6;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.contact-grid,
		.recruiter-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dispo-dot { animation: none; }
		.spinner { animation: none; }
	}
</style>
