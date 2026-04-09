export type ProjectCategory = 'infrastructure' | 'cybersecurity' | 'web' | 'iot';
export type ProjectLevel = 'beginner' | 'intermediate' | 'confident';

export interface Project {
	id: string;
	category: ProjectCategory;
	featured: boolean;
	gradientFrom: string;
	gradientTo: string;
	titleFr: string;
	titleEn: string;
	contextFr: string;
	contextEn: string;
	bulletsFr: string[];
	bulletsEn: string[];
	tags: string[];
	tagColor: 'cyan' | 'violet' | 'green' | 'neutral';
	links: { labelFr: string; labelEn: string; href: string; icon: 'external' | 'github' | 'doc' }[];
}

export const projects: Project[] = [
	{
		id: 'wazuh',
		category: 'cybersecurity',
		featured: true,
		gradientFrom: '#0a1628',
		gradientTo: '#1a3a6b',
		titleFr: 'Wazuh SIEM — Cybersécurité',
		titleEn: 'Wazuh SIEM — Cybersecurity',
		contextFr: 'Juin 2025 · 2 semaines · Hackathon',
		contextEn: 'June 2025 · 2 weeks · Hackathon',
		bulletsFr: [
			'Déployé Wazuh manager + agents sur infrastructure multi-machines (Ubuntu/Windows)',
			"Configuré règles d'alertes personnalisées pour détection d'intrusion"
		],
		bulletsEn: [
			'Deployed Wazuh manager + agents on multi-machine infrastructure (Ubuntu/Windows)',
			'Configured custom alert rules for intrusion detection'
		],
		tags: ['Wazuh', 'Ubuntu', 'Windows Server', 'SIEM'],
		tagColor: 'cyan',
		links: [
			{
				labelFr: 'Guide Wazuh',
				labelEn: 'Wazuh Guide',
				href: 'https://hackmd.io/@1lZKDAoOSziryswPJhllxg/HJ0Cjx_mxl',
				icon: 'doc'
			}
		]
	},
	{
		id: 'azure',
		category: 'infrastructure',
		featured: true,
		gradientFrom: '#003065',
		gradientTo: '#0078d4',
		titleFr: 'Projets Azure — Infrastructure Cloud',
		titleEn: 'Azure Projects — Cloud Infrastructure',
		contextFr: '2025 · Projets école · Infrastructure Cloud',
		contextEn: '2025 · School projects · Cloud Infrastructure',
		bulletsFr: [
			'Déployé un site web PHP connecté à Azure Database for MySQL (Flexible Server)',
			'Architecture Bastion sécurisée : VM publique + VM privée isolée + Azure Files'
		],
		bulletsEn: [
			'Deployed a PHP website connected to Azure Database for MySQL (Flexible Server)',
			'Secure Bastion architecture: public VM + isolated private VM + Azure Files'
		],
		tags: ['Azure', 'VM', 'MySQL', 'Bastion', 'Cloud'],
		tagColor: 'violet',
		links: [
			{
				labelFr: 'Guide Site Web + MySQL',
				labelEn: 'Website + MySQL Guide',
				href: 'https://hackmd.io/@1lZKDAoOSziryswPJhllxg/By2bPmLBbe',
				icon: 'doc'
			},
			{
				labelFr: 'Guide Bastion',
				labelEn: 'Bastion Guide',
				href: 'https://hackmd.io/@1lZKDAoOSziryswPJhllxg/r1buwKGr-e',
				icon: 'doc'
			}
		]
	},
	{
		id: 'luxeshop',
		category: 'web',
		featured: true,
		gradientFrom: '#0d1117',
		gradientTo: '#1a2234',
		titleFr: 'Luxe Shop — E-commerce Fullstack',
		titleEn: 'Luxe Shop — Fullstack E-commerce',
		contextFr: 'Février 2026 · Projet école · Développement Fullstack',
		contextEn: 'February 2026 · School project · Fullstack Development',
		bulletsFr: [
			'Boutique en ligne fullstack : Laravel 12 (API REST) + React 19 (SPA) + Stripe Checkout',
			'Panier persistant, 30 produits, authentification Sanctum, thème sombre responsive'
		],
		bulletsEn: [
			'Fullstack online store: Laravel 12 (REST API) + React 19 (SPA) + Stripe Checkout',
			'Persistent cart, 30 products, Sanctum auth, dark responsive theme'
		],
		tags: ['Laravel', 'React', 'Stripe', 'MySQL'],
		tagColor: 'cyan',
		links: [
			{
				labelFr: 'GitHub',
				labelEn: 'GitHub',
				href: 'https://github.com/Abder541/Luxe-Shop',
				icon: 'github'
			},
			{
				labelFr: 'Documentation',
				labelEn: 'Documentation',
				href: 'https://hackmd.io/@1lZKDAoOSziryswPJhllxg/SkjvZ2dv-x',
				icon: 'doc'
			}
		]
	},
	{
		id: 'iot',
		category: 'iot',
		featured: false,
		gradientFrom: '#3d000d',
		gradientTo: '#a22846',
		titleFr: 'Hackathon IoT — Raspberry Pi + Python',
		titleEn: 'IoT Hackathon — Raspberry Pi + Python',
		contextFr: 'Mars 2025 · 1 semaine · Hackathon',
		contextEn: 'March 2025 · 1 week · Hackathon',
		bulletsFr: [
			'Développé un prototype IoT — interfaçage capteurs + collecte de données',
			"Programmé en Python la logique de traitement et d'affichage des données"
		],
		bulletsEn: [
			'Developed an IoT prototype — sensor interfacing + data collection',
			'Programmed in Python the data processing and display logic'
		],
		tags: ['Raspberry Pi', 'Python', 'IoT'],
		tagColor: 'green',
		links: []
	},
	{
		id: 'vmware',
		category: 'infrastructure',
		featured: false,
		gradientFrom: '#12192e',
		gradientTo: '#2d4580',
		titleFr: 'Administration VMware ESXi',
		titleEn: 'VMware ESXi Administration',
		contextFr: '2024 · Projet école · Infrastructure & Virtualisation',
		contextEn: '2024 · School project · Infrastructure & Virtualization',
		bulletsFr: [
			'Installé et configuré un hyperviseur VMware ESXi sur serveur physique',
			'Déployé et administré des VMs Windows Server et Ubuntu (AD DS, Apache)'
		],
		bulletsEn: [
			'Installed and configured a VMware ESXi hypervisor on physical server',
			'Deployed and administered Windows Server and Ubuntu VMs (AD DS, Apache)'
		],
		tags: ['VMware ESXi', 'Windows Server', 'Ubuntu'],
		tagColor: 'violet',
		links: []
	}
];

export const featuredProjects = projects.filter((p) => p.featured);
