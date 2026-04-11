<!-- Hero.svelte — Section hero plein écran
     Canvas 3D en BACKGROUND (100vw × 100vh) + texte superposé centré.
     Le 3D est lazy-loadé (IntersectionObserver + import dynamique). -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { motionStore } from '$lib/stores/motion.svelte';
	import { langStore } from '$lib/stores/lang.svelte';
	import Scene3DFallback from '$lib/components/three/Scene3DFallback.svelte';

	let HeroScene: any = $state(null);
	let canvasReady = $state(false);
	let heroContainer: HTMLElement;

	const subtitle = $derived(
		langStore.isFr
			? 'Apprenti Informaticien CFC — Infrastructure & Cybersécurité'
			: 'IT Apprentice — Infrastructure & Cybersecurity'
	);
	const badgeText = $derived(langStore.isFr ? 'Disponible août 2026' : 'Available August 2026');
	const ctaProjects = $derived(langStore.isFr ? 'Voir mes projets' : 'See my projects');
	const ctaContact = $derived(langStore.isFr ? 'Me contacter' : 'Contact me');
	const scrollHint = $derived(langStore.isFr ? 'Scroll pour explorer' : 'Scroll to explore');

	onMount(async () => {
		if (!browser) return;
		if (motionStore.reduced) return;

		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (entry.isIntersecting) {
					try {
						const module = await import('$lib/components/three/HeroScene.svelte');
						HeroScene = module.default;
						canvasReady = true;
					} catch (e) {
						console.warn('3D non disponible, fallback utilisé:', e);
					}
					observer.disconnect();
				}
			},
			{ rootMargin: '200px' }
		);

		observer.observe(heroContainer);
		return () => observer.disconnect();
	});
</script>

<section class="hero" bind:this={heroContainer}>

	<!-- Couche 1 : Canvas 3D plein écran en arrière-plan -->
	<div class="hero-canvas" aria-hidden="true">
		{#if HeroScene && canvasReady}
			<HeroScene />
		{:else}
			<Scene3DFallback />
		{/if}
	</div>

	<!-- Couche 2 : Overlay pour lisibilité du texte -->
	<div class="hero-overlay" aria-hidden="true"></div>

	<!-- Couche 3 : Contenu texte centré -->
	<div class="hero-content container">
		<div class="hero-badge badge badge-green">
			<span class="badge-dot" aria-hidden="true"></span>
			{badgeText}
		</div>

		<h1 class="hero-title">Abderahmane<br />Chaouche</h1>

		<p class="hero-subtitle">{subtitle}</p>

		<div class="hero-cta">
			<a href="{base}/projects" class="btn btn-primary">{ctaProjects}</a>
			<a href="{base}/contact" class="btn btn-secondary">{ctaContact}</a>
		</div>
	</div>

	<!-- Indicateur scroll -->
	<div class="scroll-indicator" aria-hidden="true">
		<span class="scroll-text">{scrollHint}</span>
		<div class="scroll-line"></div>
	</div>

</section>

<style>
	.hero {
		position: relative;
		width: 100%;
		height: 100vh;
		min-height: 600px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Canvas 3D : couvre tout le hero */
	.hero-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	/* Overlay gradient pour assurer la lisibilité */
	.hero-overlay {
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(5, 8, 16, 0.55) 100%),
			linear-gradient(to bottom, rgba(5, 8, 16, 0.3) 0%, rgba(5, 8, 16, 0.1) 50%, rgba(5, 8, 16, 0.55) 100%);
	}

	/* Contenu texte : centré par-dessus le canvas */
	.hero-content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: var(--sp-6);
		padding-top: var(--nav-height);
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--sp-2);
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
		color: #fff;
		text-shadow:
			0 0 80px rgba(0, 212, 255, 0.4),
			0 2px 40px rgba(0, 0, 0, 0.7);
	}

	.hero-subtitle {
		font-family: var(--font-mono);
		font-size: var(--fs-base);
		color: rgba(232, 240, 255, 0.8);
		line-height: 1.5;
		max-width: 520px;
		text-shadow: 0 1px 12px rgba(0, 0, 0, 0.7);
	}

	.hero-cta {
		display: flex;
		gap: var(--sp-4);
		flex-wrap: wrap;
		justify-content: center;
	}

	.scroll-indicator {
		position: absolute;
		bottom: var(--sp-8);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-2);
		z-index: 2;
	}

	.scroll-text {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: rgba(232, 240, 255, 0.4);
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

	@media (prefers-reduced-motion: reduce) {
		.badge-dot { animation: none; }
		.scroll-line { animation: none; }
	}

	@media (max-width: 640px) {
		.hero-title { font-size: clamp(2.8rem, 10vw, 5rem); }
	}
</style>
