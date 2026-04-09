export interface TimelineItem {
	dateFr: string;
	dateEn: string;
	titleFr: string;
	titleEn: string;
	descFr: string;
	descEn: string;
	highlight?: boolean;
	type: 'education' | 'work' | 'hackathon' | 'certification' | 'goal';
}

export const timelineItems: TimelineItem[] = [
	{
		dateFr: 'Août 2026 (objectif)',
		dateEn: 'August 2026 (goal)',
		titleFr: 'Entrée en apprentissage — 3e année CFC',
		titleEn: 'Company apprenticeship — 3rd year CFC',
		descFr: "Recherche d'une place en entreprise pour les 3e & 4e années CFC Informaticien",
		descEn: 'Looking for a company placement for the 3rd & 4th years of IT apprenticeship',
		highlight: true,
		type: 'goal'
	},
	{
		dateFr: 'Mars 2026',
		dateEn: 'March 2026',
		titleFr: 'Certifications — Fortinet FCF · Cisco · Azure AI',
		titleEn: 'Certifications — Fortinet FCF · Cisco · Azure AI',
		descFr: 'Fortinet FCF (Cybersécurité), Cisco Cybersecurity (Networking Academy), Azure AI Essentials (Microsoft)',
		descEn: 'Fortinet FCF (Cybersecurity), Cisco Cybersecurity (Networking Academy), Azure AI Essentials (Microsoft)',
		type: 'certification'
	},
	{
		dateFr: 'Février 2026',
		dateEn: 'February 2026',
		titleFr: 'Luxe Shop — E-commerce Fullstack',
		titleEn: 'Luxe Shop — Fullstack E-commerce',
		descFr: 'Laravel 12 + React 19 + Stripe Checkout — projet école fullstack complet',
		descEn: 'Laravel 12 + React 19 + Stripe Checkout — complete fullstack school project',
		type: 'hackathon'
	},
	{
		dateFr: 'Depuis sept. 2025',
		dateEn: 'Since Sept. 2025',
		titleFr: "McDonald's Gland — Équipier",
		titleEn: "McDonald's Gland — Crew Member",
		descFr: 'Gestion autonome du grill en parallèle de la formation CFC',
		descEn: 'Autonomous grill management alongside CFC training',
		type: 'work'
	},
	{
		dateFr: 'Juin 2025',
		dateEn: 'June 2025',
		titleFr: 'Hackathon Cybersécurité — Wazuh SIEM',
		titleEn: 'Cybersecurity Hackathon — Wazuh SIEM',
		descFr: "Déploiement SIEM Wazuh en lab multi-machines, règles d'alertes (2 semaines)",
		descEn: 'Wazuh SIEM deployment in multi-machine lab, alert rules (2 weeks)',
		type: 'hackathon'
	},
	{
		dateFr: 'Mars 2025',
		dateEn: 'March 2025',
		titleFr: 'Hackathon IoT — Raspberry Pi + Python',
		titleEn: 'IoT Hackathon — Raspberry Pi + Python',
		descFr: 'Prototype IoT fonctionnel : capteurs + collecte + affichage données (1 semaine)',
		descEn: 'Functional IoT prototype: sensors + data collection + display (1 week)',
		type: 'hackathon'
	},
	{
		dateFr: 'Déc. 2024',
		dateEn: 'Dec. 2024',
		titleFr: 'Hackathon No Code — WordPress',
		titleEn: 'No Code Hackathon — WordPress',
		descFr: 'Premier hackathon No Code — création site WordPress',
		descEn: 'First No Code hackathon — WordPress site creation',
		type: 'hackathon'
	},
	{
		dateFr: 'Sept. 2024',
		dateEn: 'Sept. 2024',
		titleFr: 'Début CFC — Geneva Institute of Technology',
		titleEn: 'Start of CFC — Geneva Institute of Technology',
		descFr: 'CFC Exploitation & Infrastructure — 4 ans (2024–2028), passage en entreprise dès la 3e année',
		descEn: 'CFC Operations & Infrastructure — 4 years (2024–2028), company placement from the 3rd year',
		highlight: true,
		type: 'education'
	}
];
