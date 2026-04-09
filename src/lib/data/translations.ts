// translations.ts — Textes UI statiques pour la page d'accueil
// Pour les contenus complexes (projets, skills), voir les fichiers dédiés.

export const t = {
	// Marquee
	marquee: {
		items: [
			{ fr: '4 Hackathons complétés', en: '4 Hackathons completed' },
			{ fr: '2e année CFC · GIT', en: '2nd year CFC · GIT' },
			{ fr: 'SIEM Wazuh opérationnel', en: 'Wazuh SIEM operational' },
			{ fr: 'Lab ESXi fonctionnel', en: 'Functional ESXi lab' },
			{ fr: 'Certifié Fortinet FCF', en: 'Fortinet FCF certified' },
			{ fr: 'Certifié Cisco Cybersecurity', en: 'Cisco Cybersecurity certified' },
			{ fr: 'Azure AI Essentials', en: 'Azure AI Essentials' },
			{ fr: 'Disponible août 2026', en: 'Available August 2026' }
		]
	},

	// Section Skills (BentoGrid)
	skills: {
		label: { fr: 'Profil technique', en: 'Technical profile' },
		title: { fr: 'Compétences', en: 'Skills' },
		desc: {
			fr: 'Niveaux basés sur la pratique réelle — cours, labs, projets et hackathons.',
			en: 'Levels based on real practice — courses, labs, projects and hackathons.'
		},
		seeAll: { fr: 'Toutes les compétences →', en: 'All skills →' },
		levelConfident: { fr: 'Confiant', en: 'Confident' },
		levelIntermediate: { fr: 'Intermédiaire', en: 'Intermediate' },
		levelBeginner: { fr: 'Débutant', en: 'Beginner' },
		certTitle: { fr: 'Certifications', en: 'Certifications' },
		certs: [
			{ name: 'Fortinet FCF', color: '#10d9a0' },
			{ name: 'Cisco Cybersecurity', color: '#4f8ef7' },
			{ name: 'Azure AI Essentials', color: '#0078d4' }
		]
	},

	// Section Projects (ProjectsGrid)
	projects: {
		label: { fr: 'Réalisations', en: 'Work' },
		title: { fr: 'Projets', en: 'Projects' },
		desc: {
			fr: '3 projets clés — infra, cybersécurité, développement web.',
			en: '3 key projects — infra, cybersecurity, web development.'
		},
		seeAll: { fr: 'Tous les projets →', en: 'All projects →' },
		details: { fr: 'Voir le détail', en: 'View details' }
	},

	// Section Timeline
	timeline: {
		label: { fr: 'Parcours', en: 'Background' },
		title: { fr: 'Timeline', en: 'Timeline' },
		seeAll: { fr: 'Mon parcours complet →', en: 'Full background →' }
	},

	// Section CTA Contact
	cta: {
		title: {
			fr: 'Intéressé par mon profil ?',
			en: 'Interested in my profile?'
		},
		desc: {
			fr: "Je recherche une place d'apprentissage pour les 3e et 4e années CFC dès août 2026. Nyon, région genevoise.",
			en: "I'm looking for an apprenticeship for the 3rd and 4th years CFC starting August 2026. Nyon, Geneva area."
		},
		contact: { fr: 'Me contacter', en: 'Contact me' },
		about: { fr: 'Mon parcours', en: 'My background' }
	}
};
