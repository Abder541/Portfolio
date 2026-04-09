<!-- ParticleField.svelte — Particules flottantes en arrière-plan
     Simule des "paquets réseau" qui circulent lentement dans l'espace.
     Analogie infra : comme un Wireshark visuel — tu vois les paquets passer en 3D. -->
<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';

	// Valeurs d'initialisation — la géométrie est construite une seule fois, pas besoin de réactivité
	const COUNT = 120;
	const SPREAD = 12;
	const SPEED = 0.15;

	let pointsRef: THREE.Points | undefined = $state(undefined);

	// Crée la géométrie avec des positions aléatoires
	const positions = new Float32Array(COUNT * 3);
	const colors = new Float32Array(COUNT * 3);
	const speeds = new Float32Array(COUNT); // vitesse individuelle par particule

	// Couleurs de la palette OPS CONSOLE
	const PALETTE = [
		new THREE.Color('#00d4ff'), // cyan
		new THREE.Color('#5b8def'), // bleu
		new THREE.Color('#7c3aed'), // violet
		new THREE.Color('#10d9a0') // vert
	];

	for (let i = 0; i < COUNT; i++) {
		const i3 = i * 3;
		positions[i3] = (Math.random() - 0.5) * SPREAD;
		positions[i3 + 1] = (Math.random() - 0.5) * SPREAD;
		positions[i3 + 2] = (Math.random() - 0.5) * SPREAD * 0.6;

		// Couleur aléatoire dans la palette
		const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
		colors[i3] = color.r;
		colors[i3 + 1] = color.g;
		colors[i3 + 2] = color.b;

		speeds[i] = 0.3 + Math.random() * 0.7; // facteur de vitesse entre 0.3 et 1.0
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

	// Animation : les particules dérivent lentement vers le haut
	useTask((delta) => {
		if (!pointsRef) return;
		const posAttr = pointsRef.geometry.getAttribute('position') as THREE.BufferAttribute;
		const arr = posAttr.array as Float32Array;

		for (let i = 0; i < COUNT; i++) {
			const i3 = i * 3;
			arr[i3 + 1] += delta * SPEED * speeds[i]; // monte
			arr[i3] += Math.sin(arr[i3 + 1] * 0.5 + i) * delta * 0.02; // léger zigzag

			// Recycle la particule en bas si elle sort par le haut
			if (arr[i3 + 1] > SPREAD / 2) {
				arr[i3 + 1] = -SPREAD / 2;
				arr[i3] = (Math.random() - 0.5) * SPREAD;
			}
		}
		posAttr.needsUpdate = true;
	});
</script>

<T.Points bind:ref={pointsRef} {geometry}>
	<T.PointsMaterial
		size={0.04}
		vertexColors
		transparent
		opacity={0.6}
		depthWrite={false}
		sizeAttenuation
		blending={THREE.AdditiveBlending}
	/>
</T.Points>
