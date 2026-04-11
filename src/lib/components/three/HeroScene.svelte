<!-- HeroScene.svelte — Scène Threlte plein écran
     Rack centré, caméra plus proche, plus de lumières pour le glow des LEDs. -->
<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import ServerRack from './ServerRack.svelte';
	import ParticleField from './ParticleField.svelte';
</script>

<Canvas>
	<!-- Caméra : plus proche et FOV plus large → rack plus imposant -->
	<T.PerspectiveCamera makeDefault position={[0, 0.2, 4.5]} fov={60} />

	<!-- Lumière ambiante très douce -->
	<T.AmbientLight intensity={0.15} />

	<!-- Lumière directionnelle principale (salle serveur) -->
	<T.DirectionalLight position={[3, 5, 4]} intensity={0.3} color="#e8f0ff" />

	<!-- Spots cyan/violet plus intenses pour bloom simulé -->
	<T.PointLight position={[3, 2, 3]} intensity={60} color="#00d4ff" distance={14} decay={2} />
	<T.PointLight position={[-3, 1, -2]} intensity={40} color="#7c3aed" distance={12} decay={2} />
	<T.PointLight position={[0, -2, 2]} intensity={25} color="#5b8def" distance={10} decay={2} />
	<!-- Lumière verte derrière le rack pour les LEDs vertes -->
	<T.PointLight position={[0, 0, -1]} intensity={20} color="#10d9a0" distance={6} decay={2} />

	<!-- Rack centré (plus [0.8, ...]) -->
	<T.Group position={[0, -0.3, 0]}>
		<ServerRack />
	</T.Group>

	<!-- Particules — champ plus dense -->
	<ParticleField />

	<!-- Brouillard léger sur les bords -->
	<T.FogExp2 attach="fog" color="#050810" density={0.04} />
</Canvas>
