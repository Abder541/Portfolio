<!-- Scene3DFallback.svelte — Fallback SVG statique
     Affiché quand :
     - prefers-reduced-motion est activé (accessibilité)
     - Le composant 3D n'est pas encore chargé (loading state)
     - Le device ne supporte pas WebGL

     SVG représente un rack serveur simplifié avec LEDs. -->
<script lang="ts">
	let { class: className = '' } = $props();
</script>

<div class="fallback-container {className}" aria-hidden="true">
	<svg
		viewBox="0 0 400 500"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="fallback-svg"
	>
		<!-- Halo lumineux derrière le rack -->
		<defs>
			<radialGradient id="glow" cx="50%" cy="40%" r="50%">
				<stop offset="0%" stop-color="#00d4ff" stop-opacity="0.12" />
				<stop offset="60%" stop-color="#7c3aed" stop-opacity="0.05" />
				<stop offset="100%" stop-color="#050810" stop-opacity="0" />
			</radialGradient>
		</defs>
		<rect width="400" height="500" fill="url(#glow)" />

		<!-- Cadre du rack -->
		<rect x="80" y="50" width="8" height="400" rx="2" fill="#0a0f1e" />
		<rect x="312" y="50" width="8" height="400" rx="2" fill="#0a0f1e" />

		<!-- 8 baies de serveur -->
		{#each Array(8) as _, i}
			{@const y = 65 + i * 48}
			<!-- Corps serveur -->
			<rect x="92" y={y} width="216" height="38" rx="4" fill="#0d1117" stroke="#111826" stroke-width="1" />
			<!-- Façade -->
			<rect x="96" y={y + 4} width="208" height="30" rx="2" fill="#111826" opacity="0.8" />
			<!-- Grilles d'aération -->
			<rect x="110" y={y + 14} width="60" height="2" rx="1" fill="#1a2234" />
			<rect x="180" y={y + 14} width="60" height="2" rx="1" fill="#1a2234" />
			<rect x="110" y={y + 20} width="60" height="2" rx="1" fill="#1a2234" />
			<rect x="180" y={y + 20} width="60" height="2" rx="1" fill="#1a2234" />
			<!-- LED statut -->
			<circle
				cx="284"
				cy={y + 12}
				r="4"
				fill={i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#10d9a0' : '#5b8def'}
				opacity="0.9"
			/>
			<!-- LED secondaire -->
			<circle
				cx="296"
				cy={y + 12}
				r="3"
				fill="#10d9a0"
				opacity={i % 2 === 0 ? '0.8' : '0.3'}
			/>
		{/each}

		<!-- Halo sous le rack -->
		<ellipse cx="200" cy="460" rx="120" ry="15" fill="#00d4ff" opacity="0.06" />
	</svg>
</div>

<style>
	.fallback-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.fallback-svg {
		width: 100%;
		max-width: 400px;
		height: auto;
		opacity: 0.85;
	}
</style>
