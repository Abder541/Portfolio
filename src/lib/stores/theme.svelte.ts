// Store : thème dark / light
// Persiste dans localStorage pour mémoriser le choix de l'utilisateur.
// Par défaut : dark (la palette OPS CONSOLE est dark-first).

type Theme = 'dark' | 'light';

function createThemeStore() {
	let current = $state<Theme>('dark');

	function init() {
		if (typeof window === 'undefined') return;
		// Récupère la préférence sauvegardée, sinon 'dark' par défaut
		const saved = localStorage.getItem('portfolio-theme') as Theme | null;
		current = saved ?? 'dark';
		applyTheme(current);
	}

	function applyTheme(theme: Theme) {
		document.documentElement.setAttribute('data-theme', theme);
	}

	function toggle() {
		current = current === 'dark' ? 'light' : 'dark';
		localStorage.setItem('portfolio-theme', current);
		applyTheme(current);
	}

	function set(theme: Theme) {
		current = theme;
		localStorage.setItem('portfolio-theme', current);
		applyTheme(current);
	}

	return {
		get current() {
			return current;
		},
		get isDark() {
			return current === 'dark';
		},
		init,
		toggle,
		set
	};
}

export const themeStore = createThemeStore();
