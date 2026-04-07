// Store : prefers-reduced-motion
// Lit la préférence système de l'utilisateur.
// Si activé : désactive TOUT le 3D et toutes les animations lourdes.
// Accessible en lecture seule partout dans l'app.

function createMotionStore() {
	// Valeur par défaut = false (animations actives)
	// Côté serveur (SSR), on suppose que les animations sont OK
	let reduced = $state(false);

	function init() {
		if (typeof window === 'undefined') return;
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reduced = mq.matches;
		// Écoute les changements en temps réel (l'utilisateur peut changer la préférence)
		mq.addEventListener('change', (e) => {
			reduced = e.matches;
		});
	}

	return {
		get reduced() {
			return reduced;
		},
		init
	};
}

export const motionStore = createMotionStore();
