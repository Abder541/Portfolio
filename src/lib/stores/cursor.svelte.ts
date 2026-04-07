// Store : position et état du curseur custom
// Utilisé par CustomCursor.svelte pour le suivi.

function createCursorStore() {
	let x = $state(0);
	let y = $state(0);
	let hovering = $state(false); // survole un élément interactif

	return {
		get x() {
			return x;
		},
		get y() {
			return y;
		},
		get hovering() {
			return hovering;
		},
		setPosition(newX: number, newY: number) {
			x = newX;
			y = newY;
		},
		setHovering(value: boolean) {
			hovering = value;
		}
	};
}

export const cursorStore = createCursorStore();
