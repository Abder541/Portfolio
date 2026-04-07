// Helper i18n — Retourne le texte dans la bonne langue
// Usage : t(translations.hero.title) dans les composants

import { langStore } from '$lib/stores/lang.svelte';
import type { Lang } from '$lib/stores/lang.svelte';

export type TranslationEntry = {
	fr: string;
	en: string;
};

// Retourne la traduction selon la langue active du store
export function t(entry: TranslationEntry): string {
	return entry[langStore.current];
}

// Retourne la traduction selon une langue passée en paramètre
export function tLang(entry: TranslationEntry, lang: Lang): string {
	return entry[lang];
}
