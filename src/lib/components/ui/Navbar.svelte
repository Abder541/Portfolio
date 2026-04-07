<!-- Navbar : navigation fixe avec comportement au scroll.
     - Se cache quand on scrolle vers le bas (comme les barres d'apps mobiles)
     - Devient semi-transparente avec blur quand on scrolle (effet glassmorphism)
     - Burger menu sur mobile
     Analogie infra : comme un reverse proxy avec health-check — disparaît si "down" (scroll down), réapparaît si "up". -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import ThemeToggle from './ThemeToggle.svelte';
	import LangToggle from './LangToggle.svelte';
	import { langStore } from '$lib/stores/lang.svelte';

	let lastScroll = 0;
	let hidden = $state(false);
	let scrolled = $state(false);
	let menuOpen = $state(false);

	const navLinks = $derived([
		{
			href: `${base}/`,
			labelFr: 'Accueil',
			labelEn: 'Home'
		},
		{
			href: `${base}/projects`,
			labelFr: 'Projets',
			labelEn: 'Projects'
		},
		{
			href: `${base}/skills`,
			labelFr: 'Compétences',
			labelEn: 'Skills'
		},
		{
			href: `${base}/about`,
			labelFr: 'À propos',
			labelEn: 'About'
		},
		{
			href: `${base}/contact`,
			labelFr: 'Contact',
			labelEn: 'Contact'
		}
	]);

	onMount(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY;
			scrolled = currentScroll > 40;
			// Cache la nav seulement si on a scrollé assez bas (> 200px)
			hidden = currentScroll > lastScroll && currentScroll > 200;
			lastScroll = currentScroll;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function getLabel(link: (typeof navLinks)[0]) {
		return langStore.isFr ? link.labelFr : link.labelEn;
	}

	function isActive(href: string) {
		return $page.url.pathname === href || $page.url.pathname === href + '/';
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<nav
	class="navbar"
	class:navbar--hidden={hidden}
	class:navbar--scrolled={scrolled}
	aria-label="Navigation principale"
>
	<div class="navbar-inner container">
		<!-- Logo / Nom -->
		<a href="{base}/" class="navbar-brand" onclick={closeMenu}>
			<span class="brand-mono">AC</span>
			<span class="brand-dot">_</span>
		</a>

		<!-- Liens desktop -->
		<ul class="navbar-links" role="list">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="nav-link"
						class:nav-link--active={isActive(link.href)}
						aria-current={isActive(link.href) ? 'page' : undefined}
					>
						{getLabel(link)}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Actions droite -->
		<div class="navbar-actions">
			<LangToggle />
			<ThemeToggle />

			<!-- Burger mobile -->
			<button
				class="burger"
				class:burger--open={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
			>
				<span class="burger-line"></span>
				<span class="burger-line"></span>
				<span class="burger-line"></span>
			</button>
		</div>
	</div>

	<!-- Menu mobile -->
	<div id="mobile-menu" class="mobile-menu" class:mobile-menu--open={menuOpen}>
		<ul role="list">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="mobile-link"
						class:mobile-link--active={isActive(link.href)}
						onclick={closeMenu}
					>
						{getLabel(link)}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: var(--nav-height);
		transition:
			transform 0.4s var(--ease-out-quint),
			background 0.3s,
			border-color 0.3s;
		z-index: var(--z-nav);
	}

	.navbar--scrolled {
		background: rgba(5, 8, 16, 0.85);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border-bottom: 1px solid var(--border-subtle);
	}

	.navbar--hidden {
		transform: translateY(-100%);
	}

	.navbar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: var(--nav-height);
	}

	/* Logo */
	.navbar-brand {
		display: flex;
		align-items: center;
		text-decoration: none;
		gap: 0;
	}

	.brand-mono {
		font-family: var(--font-mono);
		font-size: var(--fs-md);
		font-weight: 700;
		color: var(--text-primary);
		letter-spacing: -0.02em;
	}

	.brand-dot {
		font-family: var(--font-mono);
		font-size: var(--fs-lg);
		color: var(--accent-cyan);
		animation: blink 1.2s step-end infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	/* Liens desktop */
	.navbar-links {
		display: flex;
		align-items: center;
		gap: var(--sp-8);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.nav-link {
		font-family: var(--font-display);
		font-size: var(--fs-sm);
		font-weight: 500;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color var(--dur-base);
		position: relative;
		padding-bottom: 2px;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--accent-cyan);
		transition: width var(--dur-base) var(--ease-out-quint);
	}

	.nav-link:hover,
	.nav-link--active {
		color: var(--text-primary);
	}

	.nav-link:hover::after,
	.nav-link--active::after {
		width: 100%;
	}

	/* Actions */
	.navbar-actions {
		display: flex;
		align-items: center;
		gap: var(--sp-3);
	}

	/* Burger */
	.burger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 36px;
		height: 36px;
		padding: var(--sp-2);
		background: transparent;
		border: 1px solid var(--border-default);
		border-radius: var(--r-sm);
		cursor: pointer;
	}

	.burger-line {
		display: block;
		height: 1px;
		background: var(--text-secondary);
		transition:
			transform 0.3s var(--ease-out-quint),
			opacity 0.3s;
		transform-origin: center;
	}

	.burger--open .burger-line:nth-child(1) {
		transform: translateY(6px) rotate(45deg);
	}

	.burger--open .burger-line:nth-child(2) {
		opacity: 0;
	}

	.burger--open .burger-line:nth-child(3) {
		transform: translateY(-6px) rotate(-45deg);
	}

	/* Menu mobile */
	.mobile-menu {
		display: none;
		position: absolute;
		top: var(--nav-height);
		left: 0;
		right: 0;
		background: rgba(5, 8, 16, 0.97);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--border-default);
		padding: var(--sp-6);
		transform: translateY(-100%);
		opacity: 0;
		transition:
			transform 0.4s var(--ease-out-quint),
			opacity 0.3s;
	}

	.mobile-menu ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
	}

	.mobile-link {
		font-size: var(--fs-lg);
		font-weight: 600;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color var(--dur-base);
	}

	.mobile-link:hover,
	.mobile-link--active {
		color: var(--accent-cyan);
	}

	@media (max-width: 768px) {
		.navbar-links {
			display: none;
		}

		.burger {
			display: flex;
		}

		.mobile-menu {
			display: block;
		}

		.mobile-menu--open {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
