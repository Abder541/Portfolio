<!-- LangToggle : bascule FR ↔ EN.
     Affiche "FR" ou "EN" selon la langue active. -->
<script lang="ts">
	import { langStore } from '$lib/stores/lang.svelte';
</script>

<button
	class="lang-toggle"
	onclick={() => langStore.toggle()}
	aria-label={langStore.isFr ? 'Switch to English' : 'Passer en français'}
	title={langStore.isFr ? 'Switch to English' : 'Passer en français'}
>
	<span class="lang-label">{langStore.current.toUpperCase()}</span>
</button>

<style>
	.lang-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 36px;
		padding: 0 var(--sp-3);
		border-radius: var(--r-sm);
		background: transparent;
		border: 1px solid var(--border-default);
		cursor: pointer;
		transition:
			color var(--dur-base) var(--ease-out-quint),
			border-color var(--dur-base) var(--ease-out-quint),
			background var(--dur-base);
	}

	.lang-toggle:hover {
		border-color: var(--accent-cyan);
		background: rgba(0, 212, 255, 0.05);
	}

	.lang-label {
		font-family: var(--font-mono);
		font-size: var(--fs-xs);
		font-weight: 600;
		letter-spacing: 0.1em;
		color: var(--text-secondary);
	}

	.lang-toggle:hover .lang-label {
		color: var(--accent-cyan);
	}
</style>
