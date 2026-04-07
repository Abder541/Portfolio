<script lang="ts">
	import { base } from '$app/paths';
	import { langStore } from '$lib/stores/lang.svelte';

	const currentYear = new Date().getFullYear();

	const links = {
		github: 'https://github.com/Abder541',
		linkedin: 'https://www.linkedin.com/in/abderahmanechaouche',
		credly: 'https://www.credly.com/users/abderahmane-chaouche'
	};

	const label = $derived(
		langStore.isFr
			? 'Construit avec SvelteKit + Threlte. Hébergé sur GitHub Pages.'
			: 'Built with SvelteKit + Threlte. Hosted on GitHub Pages.'
	);
</script>

<footer class="footer">
	<div class="footer-inner container">
		<div class="footer-left">
			<span class="footer-name">Abderahmane Chaouche</span>
			<span class="footer-meta text-mono">{label}</span>
		</div>

		<div class="footer-socials">
			<a
				href={links.github}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub — Abder541"
				class="social-link"
			>
				<!-- GitHub icon -->
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.393.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.742 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
				</svg>
			</a>

			<a
				href={links.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn — Abderahmane Chaouche"
				class="social-link"
			>
				<!-- LinkedIn icon -->
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
				</svg>
			</a>

			<a
				href={links.credly}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Credly — Certifications Abderahmane Chaouche"
				class="social-link"
			>
				<!-- Badge icon (Credly) -->
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M12 2L14.5 8.5H21L15.75 12.5L17.5 19L12 15.25L6.5 19L8.25 12.5L3 8.5H9.5L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
				</svg>
			</a>
		</div>

		<div class="footer-right">
			<span class="footer-copy text-mono">© {currentYear}</span>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--bg-surface);
		border-top: 1px solid var(--border-subtle);
		padding: var(--sp-8) 0;
		margin-top: auto;
	}

	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--sp-6);
		flex-wrap: wrap;
	}

	.footer-left {
		display: flex;
		flex-direction: column;
		gap: var(--sp-1);
	}

	.footer-name {
		font-family: var(--font-display);
		font-size: var(--fs-sm);
		font-weight: 600;
		color: var(--text-primary);
	}

	.footer-meta {
		font-size: var(--fs-xs);
		color: var(--text-dim);
	}

	.footer-socials {
		display: flex;
		align-items: center;
		gap: var(--sp-4);
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		color: var(--text-muted);
		border-radius: var(--r-sm);
		transition:
			color var(--dur-base),
			background var(--dur-base);
	}

	.social-link:hover {
		color: var(--accent-cyan);
		background: rgba(0, 212, 255, 0.05);
	}

	.footer-copy {
		font-size: var(--fs-xs);
		color: var(--text-dim);
	}

	@media (max-width: 640px) {
		.footer-inner {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--sp-4);
		}
	}
</style>
