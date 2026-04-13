<!-- TechLogo.svelte — Icône SVG représentant la techno principale d'un projet.
     Utilisée en filigrane décoratif sur les banners de cartes projets. -->
<script lang="ts">
	import type { TechIcon } from '$lib/data/projects';

	interface Props {
		icon: TechIcon;
		size?: number;
	}

	let { icon, size = 80 }: Props = $props();
</script>

{#if icon === 'wazuh'}
	<!-- Bouclier / sécurité -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z" />
		<path d="m9 12 2 2 4-4" />
	</svg>
{:else if icon === 'azure'}
	<!-- Triangle Azure stylisé -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M13.05 4.24 6.56 18.05 2 18l5.09-8.82 5.96-4.94zm.72 1.16 3.59 10.1L8.29 17.1 16 18.47h6L13.77 5.4z" />
	</svg>
{:else if icon === 'raspberry'}
	<!-- Raspberry Pi stylisé (cœur + feuilles) -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M9 3c.5 1.5 1.8 2.3 3 2.3S14.5 4.5 15 3" />
		<path d="M7.5 5.5C6 5 4.5 5.5 4 7c-.4 1 0 2 .8 2.5" />
		<path d="M16.5 5.5C18 5 19.5 5.5 20 7c.4 1 0 2-.8 2.5" />
		<ellipse cx="12" cy="14" rx="7" ry="6" />
		<circle cx="9.5" cy="13" r=".8" fill="currentColor" />
		<circle cx="14.5" cy="13" r=".8" fill="currentColor" />
		<path d="M10 16.5c.6.4 1.3.6 2 .6s1.4-.2 2-.6" />
	</svg>
{:else if icon === 'vmware'}
	<!-- Trois barres horizontales VMware -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<rect x="3" y="6" width="18" height="2.4" rx="1.2" />
		<rect x="3" y="10.8" width="13" height="2.4" rx="1.2" />
		<rect x="3" y="15.6" width="8" height="2.4" rx="1.2" />
	</svg>
{:else if icon === 'laravel'}
	<!-- Laravel — chevron diagonal stylisé -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.6"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M3 17 12 3l3 5-9 14z" />
		<path d="m12 3 9 14-9 4-3-5z" />
	</svg>
{/if}
