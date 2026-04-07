<!-- ThemeToggle : bascule dark ↔ light.
     Icône soleil en light, lune en dark. -->
<script lang="ts">
	import { themeStore } from '$lib/stores/theme.svelte';
</script>

<button
	class="theme-toggle"
	onclick={() => themeStore.toggle()}
	aria-label={themeStore.isDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
	title={themeStore.isDark ? 'Thème clair' : 'Thème sombre'}
>
	{#if themeStore.isDark}
		<!-- Soleil -->
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" />
			<line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
		</svg>
	{:else}
		<!-- Lune -->
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: var(--r-sm);
		background: transparent;
		border: 1px solid var(--border-default);
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			color var(--dur-base) var(--ease-out-quint),
			border-color var(--dur-base) var(--ease-out-quint),
			background var(--dur-base);
	}

	.theme-toggle:hover {
		color: var(--accent-cyan);
		border-color: var(--accent-cyan);
		background: rgba(0, 212, 255, 0.05);
	}
</style>
