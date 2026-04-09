<!-- Hero.svelte — Section hero complète (100vh)
     - Gauche : nom + titre + badge dispo + CTAs
     - Droite : scène 3D (rack serveur) ou fallback SVG
     - Le composant 3D est chargé en lazy (import dynamique) :
       * Seulement côté client (pas au SSR)
       * Seulement si le viewport est visible (IntersectionObserver)
       * Seulement si prefers-reduced-motion n'est PAS activé -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { motionStore } from '$lib/stores/motion.svelte';
	import { langStore } from '$lib/stores/lang.svelte';
	import Scene3DFallback from '$lib/components/three/Scene3DFallback.svelte';

	// Le composant HeroScene sera importé dynamiquement
	let HeroScene: any = $state(null);
	let canvasReady = $state(false);
	let heroContainer: HTMLDivElement;

	const title = $derived(langStore.isFr ? 'Abderahmane Chaouche' : 'Abderahmane Chaouche');
	const subtitle = $derived(
		langStore.isFr
			? 'Apprenti Informaticien CFC — Infrastructure & Cybersécurité'
			: 'IT Apprentice — Infrastructure & Cybersecurity'
	);
	const badgeText = $derived(
		langStore.isFr ? 'Disponible août 2026' : 'Available August 2026'
	);
	const ctaProjects = $derived(langStore.isFr ? 'Voir mes projets' : 'See my projects');
	const ctaContact = $derived(langStore.isFr ? 'Me contacter' : 'Contact me');
	const scrollHint = $derived(langStore.isFr ? 'Scroll pour explorer' : 'Scroll to explore');

	onMount(async () => {
		if (!browser) return;

		// Si reduced-motion activé → on ne charge jamais le 3D
		if (motionStore.reduced) return;

		// IntersectionObserver : charge le 3D seulement quand la section hero est visible
		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (entry.isIntersecting) {
					try {
						const module = await import('$lib/components/three/HeroScene.svelte');
						HeroScene = module.default;
						canvasReady = true;
					} catch (e) {
						// Si WebGL non supporté ou erreur, le fallback SVG reste affiché
						console.warn('3D non disponible, fallback SVG utilisé:', e);
					}
					observer.disconnect();
				}
			},
			{ rootMargin: '200px' } // charge 200px avant d'être visible
		);

		observer.observe(heroContainer);

		return () => observer.disconnect();
	});
</script>

<section class="hero" bind:this={heroContainer}>
	<!-- Gradient d'ambiance en arrière-plan -->
	<div class="hero-gradient" aria-hidden="true"></div>

	<div class="hero-inner container">
		<!-- Colonne gauche : texte -->
		<div class="hero-text">
			<!-- Badge disponibilité -->
			<div class="hero-badge badge badge-green">
				<span class="badge-dot" aria-hidden="true"></span>
				{badgeText}
			</div>

			<!-- Nom (titre principal) -->
			<h1 class="hero-title">{title}</h1>

			<!-- Sous-titre -->
			<p class="hero-subtitle">{subtitle}</p>

			<!-- CTA -->
			<div class="hero-cta">
				<a href="{base}/projects" class="btn btn-primary">{ctaProjects}</a>
				<a href="{base}/contact" class="btn btn-secondary">{ctaContact}</a>
			</div>
		</div>

		<!-- Colonne droite : 3D ou fallback -->
		<div class="hero-visual" aria-hidden="true">
			{#if HeroScene && canvasReady}
				<HeroScene />
			{:else}
				<Scene3DFallback />
			{/if}
		</div>
	</div>

	<!-- Indicateur de scroll -->
	<div class="scroll-indicator" aria-hidden="true">
		<span class="scroll-text">{scrollHint}</span>
		<div class="scroll-line"></div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		padding-top: var(--nav-height);
	}

	/* Gradient d'ambiance — radial cyan subtil en haut */
	.hero-gradient {
		position: absolute;
		inset: 0;
		background: var(--gradient-hero);
		pointer-events: none;
		z-index: 0;
	}

	.hero-inner {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: var(--sp-12);
		min-height: calc(100vh - var(--nav-height) - 80px);
	}

	/* --- Texte --- */
	.hero-text {
		display: flex;
		flex-direction: column;
		gap: var(--sp-6);
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--sp-2);
		width: fit-content;
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

	.hero-title {
		font-family: var(--font-display);
		font-size: var(--fs-hero);
		font-weight: 800;
		line-height: 0.95;
		letter-spacing: -0.04em;
		color: var(--text-primary);
	}

	.hero-subtitle {
		font-family: var(--font-mono);
		font-size: var(--fs-base);
		color: var(--text-muted);
		line-height: 1.5;
		max-width: 480px;
	}

	.hero-cta {
		display: flex;
		gap: var(--sp-4);
		flex-wrap: wrap;
	}

	/* --- Visual 3D / Fallback --- */
	.hero-visual {
		width: 100%;
		height: 500px;
		position: relative;
	}

	/* --- Scroll indicator --- */
	.scroll-indicator {
		position: absolute;
		bottom: var(--sp-8);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-2);
		z-index: 1;
	}

	.scroll-text {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--text-dim);
	}

	.scroll-line {
		width: 1px;
		height: 40px;
		background: linear-gradient(to bottom, var(--accent-cyan), transparent);
		animation: scroll-bounce 2s ease-in-out infinite;
	}

	@keyframes scroll-bounce {
		0%, 100% { transform: scaleY(1); opacity: 1; }
		50% { transform: scaleY(0.5); opacity: 0.3; }
	}

	/* --- Responsive --- */
	@media (max-width: 1024px) {
		.hero-inner {
			grid-template-columns: 1fr;
			text-align: center;
			gap: var(--sp-8);
		}

		.hero-text {
			align-items: center;
		}

		.hero-visual {
			height: 350px;
		}

		.hero-cta {
			justify-content: center;
		}
	}

	@media (max-width: 640px) {
		.hero-title {
			font-size: clamp(2.5rem, 8vw, 4rem);
		}

		.hero-visual {
			height: 280px;
		}
	}

	/* Pas de pulse si reduced-motion */
	@media (prefers-reduced-motion: reduce) {
		.badge-dot {
			animation: none;
		}
		.scroll-line {
			animation: none;
		}
	}
</style>
