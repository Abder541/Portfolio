<!-- ServerRack.svelte — Rack serveur 3D procédural
     8 baies de serveur empilées, chacune avec des LEDs clignotantes.
     Le rack pivote légèrement avec la souris (parallaxe 3D).
     Analogie infra : c'est littéralement un rack 42U en miniature ! -->
<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Float } from '@threlte/extras';
	import { onMount } from 'svelte';

	// Nombre de baies de serveur dans le rack
	const SERVER_COUNT = 8;
	const SERVER_HEIGHT = 0.35;
	const SERVER_GAP = 0.4;
	const RACK_WIDTH = 2;
	const RACK_DEPTH = 1;

	// Couleurs des LEDs — alternance cyan (actif) / vert (OK)
	const LED_COLORS = ['#00d4ff', '#10d9a0', '#5b8def', '#00d4ff', '#10d9a0', '#7c3aed', '#00d4ff', '#10d9a0'];

	// État de clignotement de chaque LED
	let ledStates: boolean[] = $state(Array(SERVER_COUNT).fill(true));

	// Rotation du rack basée sur la position de la souris
	let mouseX = $state(0);
	let mouseY = $state(0);
	let targetRotationY = $state(0);
	let targetRotationX = $state(0);
	let currentRotationY = $state(0);
	let currentRotationX = $state(0);

	onMount(() => {
		// Suivi de la souris pour le parallaxe
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 à 1
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
			targetRotationY = mouseX * 0.3; // Max 0.3 radians (~17°)
			targetRotationX = mouseY * -0.15;
		};

		window.addEventListener('mousemove', handleMouseMove);

		// Clignotement aléatoire des LEDs
		const blinkInterval = setInterval(() => {
			const idx = Math.floor(Math.random() * SERVER_COUNT);
			ledStates[idx] = !ledStates[idx];
			// Rétablir après un court délai
			setTimeout(() => {
				ledStates[idx] = true;
			}, 150 + Math.random() * 300);
		}, 400);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			clearInterval(blinkInterval);
		};
	});

	// Animation continue — interpolation douce vers la rotation cible
	useTask((delta) => {
		const lerp = 1 - Math.pow(0.001, delta);
		currentRotationY += (targetRotationY - currentRotationY) * lerp;
		currentRotationX += (targetRotationX - currentRotationX) * lerp;
	});

	// Position Y d'un serveur dans le rack
	function serverY(index: number): number {
		return index * SERVER_GAP - ((SERVER_COUNT - 1) * SERVER_GAP) / 2;
	}
</script>

<!-- Rotation douce du rack entier selon la souris -->
<Float speed={1.5} floatIntensity={0.15} rotationIntensity={0}>
	<T.Group rotation.y={currentRotationY} rotation.x={currentRotationX}>

		<!-- Cadre du rack (structure métallique) -->
		<!-- Montants gauche et droit -->
		<T.Mesh position={[-RACK_WIDTH / 2 - 0.05, 0, 0]}>
			<T.BoxGeometry args={[0.06, SERVER_COUNT * SERVER_GAP + 0.3, RACK_DEPTH + 0.1]} />
			<T.MeshStandardMaterial color="#0a0f1e" metalness={0.9} roughness={0.15} />
		</T.Mesh>
		<T.Mesh position={[RACK_WIDTH / 2 + 0.05, 0, 0]}>
			<T.BoxGeometry args={[0.06, SERVER_COUNT * SERVER_GAP + 0.3, RACK_DEPTH + 0.1]} />
			<T.MeshStandardMaterial color="#0a0f1e" metalness={0.9} roughness={0.15} />
		</T.Mesh>

		<!-- Baies de serveur -->
		{#each Array(SERVER_COUNT) as _, i}
			{@const y = serverY(i)}

			<!-- Corps du serveur -->
			<T.Mesh position={[0, y, 0]}>
				<T.BoxGeometry args={[RACK_WIDTH, SERVER_HEIGHT, RACK_DEPTH]} />
				<T.MeshStandardMaterial
					color="#0d1117"
					metalness={0.7}
					roughness={0.25}
					emissive="#00d4ff"
					emissiveIntensity={0.02}
				/>
			</T.Mesh>

			<!-- Façade du serveur (face avant, légèrement en relief) -->
			<T.Mesh position={[0, y, RACK_DEPTH / 2 + 0.005]}>
				<T.BoxGeometry args={[RACK_WIDTH - 0.05, SERVER_HEIGHT - 0.04, 0.01]} />
				<T.MeshStandardMaterial
					color="#111826"
					metalness={0.6}
					roughness={0.3}
				/>
			</T.Mesh>

			<!-- Grille d'aération (petites barres horizontales) -->
			{#each Array(3) as _, j}
				<T.Mesh position={[-0.5 + j * 0.5, y, RACK_DEPTH / 2 + 0.015]}>
					<T.BoxGeometry args={[0.35, 0.015, 0.005]} />
					<T.MeshStandardMaterial color="#1a2234" metalness={0.5} roughness={0.4} />
				</T.Mesh>
			{/each}

			<!-- LED de statut — clignotante -->
			<T.Mesh position={[RACK_WIDTH / 2 - 0.15, y + 0.08, RACK_DEPTH / 2 + 0.02]}>
				<T.SphereGeometry args={[0.025, 8, 8]} />
				<T.MeshBasicMaterial
					color={ledStates[i] ? LED_COLORS[i] : '#1a2234'}
				/>
			</T.Mesh>

			<!-- LED secondaire (activité disque / réseau) -->
			<T.Mesh position={[RACK_WIDTH / 2 - 0.25, y + 0.08, RACK_DEPTH / 2 + 0.02]}>
				<T.SphereGeometry args={[0.02, 8, 8]} />
				<T.MeshBasicMaterial
					color={ledStates[(i + 3) % SERVER_COUNT] ? '#10d9a0' : '#1a2234'}
				/>
			</T.Mesh>

			<!-- Séparateur entre serveurs -->
			{#if i < SERVER_COUNT - 1}
				<T.Mesh position={[0, y + SERVER_GAP / 2, RACK_DEPTH / 2 + 0.01]}>
					<T.BoxGeometry args={[RACK_WIDTH + 0.1, 0.008, 0.01]} />
					<T.MeshStandardMaterial color="#1a2234" metalness={0.4} roughness={0.5} />
				</T.Mesh>
			{/if}
		{/each}

		<!-- Halo lumineux derrière le rack (simule les câbles) -->
		<T.PointLight position={[0, 0, -RACK_DEPTH]} intensity={8} color="#00d4ff" distance={4} decay={2} />
		<T.PointLight position={[0.5, 1, -RACK_DEPTH]} intensity={4} color="#7c3aed" distance={3} decay={2} />

	</T.Group>
</Float>
