// Store : langue FR / EN
// Persiste dans localStorage.
// Par défaut : 'fr' (Suisse francophone).

export type Lang = 'fr' | 'en';

function createLangStore() {
	let current = $state<Lang>('fr');

	function init() {
		if (typeof window === 'undefined') return;
		const saved = localStorage.getItem('portfolio-lang') as Lang | null;
		// Détecte la langue du navigateur si rien de sauvegardé
		const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
		current = saved ?? browserLang;
	}

	function toggle() {
		current = current === 'fr' ? 'en' : 'fr';
		localStorage.setItem('portfolio-lang', current);
	}

	function set(lang: Lang) {
		current = lang;
		localStorage.setItem('portfolio-lang', current);
	}

	return {
		get current() {
			return current;
		},
		get isFr() {
			return current === 'fr';
		},
		init,
		toggle,
		set
	};
}

export const langStore = createLangStore();
