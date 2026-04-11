<!-- ParticleField.svelte — Champ de particules dense en arrière-plan
     280 particules, plus visibles, blending additif = effet lumineux. -->
<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';

	const COUNT = 280;
	const SPREAD = 18;
	const SPEED = 0.2;

	let pointsRef: THREE.Points | undefined = $state(undefined);

	const positions = new Float32Array(COUNT * 3);
	const colors = new Float32Array(COUNT * 3);
	const speeds = new Float32Array(COUNT);

	const PALETTE = [
		new THREE.Color('#00d4ff'),
		new THREE.Color('#5b8def'),
		new THREE.Color('#7c3aed'),
		new THREE.Color('#10d9a0'),
		new THREE.Color('#00d4ff'), // cyan surreprésenté
		new THREE.Color('#00d4ff')
	];

	for (let i = 0; i < COUNT; i++) {
		const i3 = i * 3;
		positions[i3]     = (Math.random() - 0.5) * SPREAD;
		positions[i3 + 1] = (Math.random() - 0.5) * SPREAD;
		positions[i3 + 2] = (Math.random() - 0.5) * SPREAD * 0.8;

		const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
		colors[i3]     = color.r;
		colors[i3 + 1] = color.g;
		colors[i3 + 2] = color.b;

		speeds[i] = 0.3 + Math.random() * 0.8;
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

	useTask((delta) => {
		if (!pointsRef) return;
		const posAttr = pointsRef.geometry.getAttribute('position') as THREE.BufferAttribute;
		const arr = posAttr.array as Float32Array;

		for (let i = 0; i < COUNT; i++) {
			const i3 = i * 3;
			arr[i3 + 1] += delta * SPEED * speeds[i];
			arr[i3]     += Math.sin(arr[i3 + 1] * 0.4 + i) * delta * 0.025;

			if (arr[i3 + 1] > SPREAD / 2) {
				arr[i3 + 1] = -SPREAD / 2;
				arr[i3]     = (Math.random() - 0.5) * SPREAD;
			}
		}
		posAttr.needsUpdate = true;
	});
</script>

<T.Points bind:ref={pointsRef} {geometry}>
	<T.PointsMaterial
		size={0.07}
		vertexColors
		transparent
		opacity={0.75}
		depthWrite={false}
		sizeAttenuation
		blending={THREE.AdditiveBlending}
	/>
</T.Points>
