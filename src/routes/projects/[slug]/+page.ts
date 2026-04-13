import { error } from '@sveltejs/kit';
import { projects, getProject } from '$lib/data/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return projects.map((p) => ({ slug: p.id }));
};

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) {
		throw error(404, `Projet introuvable : ${params.slug}`);
	}
	return { project };
};
