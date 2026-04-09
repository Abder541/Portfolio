<!-- HeroScene.svelte — Scène Threlte complète pour le Hero
     Assemble : caméra, lumières, ServerRack, ParticleField.
     Ce composant est lazy-loadé par Hero.svelte (pas chargé au SSR). -->
<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import ServerRack from './ServerRack.svelte';
	import ParticleField from './ParticleField.svelte';
</script>

<Canvas>
	<!-- Caméra perspective — FOV 45 = rendu "cinématique", pas trop déformé -->
	<T.PerspectiveCamera makeDefault position={[0, 0.5, 6]} fov={45} />

	<!-- Lumière ambiante douce — éclaire tout uniformément -->
	<T.AmbientLight intensity={0.2} />

	<!-- Lumière directionnelle principale — simule un éclairage de salle serveur -->
	<T.DirectionalLight position={[5, 5, 5]} intensity={0.4} color="#e8f0ff" />

	<!-- Spots colorés — éclairage d'ambiance OPS CONSOLE -->
	<T.PointLight position={[4, 3, 4]} intensity={40} color="#00d4ff" distance={12} decay={2} />
	<T.PointLight position={[-4, 2, -3]} intensity={25} color="#7c3aed" distance={10} decay={2} />
	<T.PointLight position={[0, -3, 2]} intensity={15} color="#5b8def" distance={8} decay={2} />

	<!-- Rack serveur 3D — centré, légèrement décalé à droite -->
	<T.Group position={[0.8, -0.2, 0]}>
		<ServerRack />
	</T.Group>

	<!-- Particules réseau en arrière-plan -->
	<ParticleField />

	<!-- Brouillard — efface les bords de la scène pour un fondu naturel -->
	<T.FogExp2 attach="fog" color="#050810" density={0.06} />
</Canvas>
