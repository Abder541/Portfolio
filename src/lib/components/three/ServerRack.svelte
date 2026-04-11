<!-- ServerRack.svelte — Rack serveur 3D procédural
     Parallaxe prononcé, rack plus grand, LEDs avec glow simulé. -->
<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Float } from '@threlte/extras';
	import { onMount } from 'svelte';

	const SERVER_COUNT = 8;
	const SERVER_HEIGHT = 0.35;
	const SERVER_GAP = 0.42;
	const RACK_WIDTH = 2.2;
	const RACK_DEPTH = 1.1;

	const LED_COLORS = [
		'#00d4ff', '#10d9a0', '#5b8def', '#00d4ff',
		'#10d9a0', '#7c3aed', '#00d4ff', '#10d9a0'
	];

	let ledStates: boolean[] = $state(Array(SERVER_COUNT).fill(true));

	let targetRotationY = $state(0);
	let targetRotationX = $state(0);
	let currentRotationY = $state(0);
	let currentRotationX = $state(0);

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const x = (e.clientX / window.innerWidth - 0.5) * 2;
			const y = (e.clientY / window.innerHeight - 0.5) * 2;
			// Parallaxe plus prononcé (×2 vs avant)
			targetRotationY = x * 0.6;
			targetRotationX = y * -0.3;
		};

		window.addEventListener('mousemove', handleMouseMove);

		// Clignotement aléatoire des LEDs
		const blinkInterval = setInterval(() => {
			const idx = Math.floor(Math.random() * SERVER_COUNT);
			ledStates[idx] = !ledStates[idx];
			setTimeout(() => { ledStates[idx] = true; }, 120 + Math.random() * 250);
		}, 350);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			clearInterval(blinkInterval);
		};
	});

	// Lerp continu
	useTask((delta) => {
		const lerp = 1 - Math.pow(0.001, delta);
		currentRotationY += (targetRotationY - currentRotationY) * lerp;
		currentRotationX += (targetRotationX - currentRotationX) * lerp;
	});

	function serverY(index: number): number {
		return index * SERVER_GAP - ((SERVER_COUNT - 1) * SERVER_GAP) / 2;
	}
</script>

<!-- Scale 1.35 → rack plus grand sans toucher aux dimensions de base -->
<Float speed={1.2} floatIntensity={0.12} rotationIntensity={0}>
	<T.Group rotation.y={currentRotationY} rotation.x={currentRotationX} scale={1.35}>

		<!-- Montants gauche et droit -->
		<T.Mesh position={[-RACK_WIDTH / 2 - 0.05, 0, 0]}>
			<T.BoxGeometry args={[0.07, SERVER_COUNT * SERVER_GAP + 0.35, RACK_DEPTH + 0.12]} />
			<T.MeshStandardMaterial color="#0a0f1e" metalness={0.9} roughness={0.15} />
		</T.Mesh>
		<T.Mesh position={[RACK_WIDTH / 2 + 0.05, 0, 0]}>
			<T.BoxGeometry args={[0.07, SERVER_COUNT * SERVER_GAP + 0.35, RACK_DEPTH + 0.12]} />
			<T.MeshStandardMaterial color="#0a0f1e" metalness={0.9} roughness={0.15} />
		</T.Mesh>

		<!-- Panneau arrière du rack (réflecteur de lumière) -->
		<T.Mesh position={[0, 0, -RACK_DEPTH / 2 - 0.02]}>
			<T.BoxGeometry args={[RACK_WIDTH + 0.2, SERVER_COUNT * SERVER_GAP + 0.35, 0.02]} />
			<T.MeshStandardMaterial color="#070d1a" metalness={0.95} roughness={0.05} />
		</T.Mesh>

		<!-- Baies de serveur -->
		{#each Array(SERVER_COUNT) as _, i}
			{@const y = serverY(i)}
			{@const ledOn = ledStates[i]}
			{@const ledColor = LED_COLORS[i]}

			<!-- Corps du serveur -->
			<T.Mesh position={[0, y, 0]}>
				<T.BoxGeometry args={[RACK_WIDTH, SERVER_HEIGHT, RACK_DEPTH]} />
				<T.MeshStandardMaterial
					color="#0d1117"
					metalness={0.7}
					roughness={0.25}
					emissive={ledColor}
					emissiveIntensity={ledOn ? 0.04 : 0.01}
				/>
			</T.Mesh>

			<!-- Façade -->
			<T.Mesh position={[0, y, RACK_DEPTH / 2 + 0.005]}>
				<T.BoxGeometry args={[RACK_WIDTH - 0.05, SERVER_HEIGHT - 0.04, 0.01]} />
				<T.MeshStandardMaterial color="#111826" metalness={0.6} roughness={0.3} />
			</T.Mesh>

			<!-- Grille aération -->
			{#each Array(3) as _, j}
				<T.Mesh position={[-0.55 + j * 0.55, y, RACK_DEPTH / 2 + 0.015]}>
					<T.BoxGeometry args={[0.38, 0.015, 0.005]} />
					<T.MeshStandardMaterial color="#1a2234" metalness={0.5} roughness={0.4} />
				</T.Mesh>
			{/each}

			<!-- LED principale — glow simulé via emissiveIntensity élevé -->
			<T.Mesh position={[RACK_WIDTH / 2 - 0.15, y + 0.09, RACK_DEPTH / 2 + 0.025]}>
				<T.SphereGeometry args={[0.032, 10, 10]} />
				<T.MeshBasicMaterial color={ledOn ? ledColor : '#1a2234'} />
			</T.Mesh>

			<!-- PointLight sur chaque LED active → bloom organique -->
			{#if ledOn}
				<T.PointLight
					position={[RACK_WIDTH / 2 - 0.15, y + 0.09, RACK_DEPTH / 2 + 0.1]}
					intensity={3}
					color={ledColor}
					distance={1.2}
					decay={2}
				/>
			{/if}

			<!-- LED secondaire (activité réseau) -->
			<T.Mesh position={[RACK_WIDTH / 2 - 0.27, y + 0.09, RACK_DEPTH / 2 + 0.025]}>
				<T.SphereGeometry args={[0.024, 8, 8]} />
				<T.MeshBasicMaterial
					color={ledStates[(i + 3) % SERVER_COUNT] ? '#10d9a0' : '#1a2234'}
				/>
			</T.Mesh>

			<!-- Séparateur -->
			{#if i < SERVER_COUNT - 1}
				<T.Mesh position={[0, y + SERVER_GAP / 2, RACK_DEPTH / 2 + 0.01]}>
					<T.BoxGeometry args={[RACK_WIDTH + 0.12, 0.008, 0.01]} />
					<T.MeshStandardMaterial color="#1a2234" metalness={0.4} roughness={0.5} />
				</T.Mesh>
			{/if}
		{/each}

		<!-- Halos lumineux câbles arrière -->
		<T.PointLight position={[0, 0, -RACK_DEPTH]} intensity={12} color="#00d4ff" distance={5} decay={2} />
		<T.PointLight position={[0.6, 1.2, -RACK_DEPTH]} intensity={7} color="#7c3aed" distance={4} decay={2} />
		<T.PointLight position={[-0.6, -1, -RACK_DEPTH]} intensity={5} color="#10d9a0" distance={3} decay={2} />

	</T.Group>
</Float>
