export type ProjectCategory = 'infrastructure' | 'cybersecurity' | 'web' | 'iot';
export type ProjectLevel = 'beginner' | 'intermediate' | 'confident';
export type TechIcon = 'wazuh' | 'azure' | 'raspberry' | 'vmware' | 'laravel';

export interface ProjectLink {
	labelFr: string;
	labelEn: string;
	href: string;
	icon: 'external' | 'github' | 'doc';
}

export interface StackRow {
	layerFr: string;
	layerEn: string;
	tech: string;
}

export interface Project {
	id: string;
	category: ProjectCategory;
	featured: boolean;
	gradientFrom: string;
	gradientTo: string;
	icon?: TechIcon;
	image?: string;
	titleFr: string;
	titleEn: string;
	contextFr: string;
	contextEn: string;
	summaryFr: string;
	summaryEn: string;
	bulletsFr: string[];
	bulletsEn: string[];
	highlightsFr: string[];
	highlightsEn: string[];
	stack: StackRow[];
	sidebarTags: string[];
	infoFr: string[];
	infoEn: string[];
	tags: string[];
	tagColor: 'cyan' | 'violet' | 'green' | 'neutral';
	links: ProjectLink[];
}

export const projects: Project[] = [
	{
		id: 'wazuh',
		category: 'cybersecurity',
		featured: true,
		gradientFrom: '#0a1628',
		gradientTo: '#1a3a6b',
		icon: 'wazuh',
		titleFr: 'Wazuh SIEM — Cybersécurité',
		titleEn: 'Wazuh SIEM — Cybersecurity',
		contextFr: 'Juin 2025 · 2 semaines · Hackathon',
		contextEn: 'June 2025 · 2 weeks · Hackathon',
		summaryFr:
			"Déploiement d'un SIEM complet : hardening Ubuntu, Wazuh Manager + Dashboard + Indexer, agent connecté en communication chiffrée.",
		summaryEn:
			'Full SIEM deployment: Ubuntu hardening, Wazuh Manager + Dashboard + Indexer, agent connected via encrypted communication.',
		bulletsFr: [
			'Déployé Wazuh manager + agents sur infrastructure multi-machines (Ubuntu/Windows)',
			"Configuré règles d'alertes personnalisées pour détection d'intrusion"
		],
		bulletsEn: [
			'Deployed Wazuh manager + agents on multi-machine infrastructure (Ubuntu/Windows)',
			'Configured custom alert rules for intrusion detection'
		],
		highlightsFr: [
			'Durci un serveur Ubuntu (AppArmor, auditd, SSH par clé RSA 4096, UFW, Fail2Ban)',
			'Déployé Wazuh Manager 4.12 avec Dashboard et Indexer sur une VM dédiée',
			'Connecté un agent Wazuh avec communication chiffrée (port 1514)',
			"Automatisé la reconnexion de l'agent via un script Bash + crontab"
		],
		highlightsEn: [
			'Hardened an Ubuntu server (AppArmor, auditd, RSA 4096 SSH keys, UFW, Fail2Ban)',
			'Deployed Wazuh Manager 4.12 with Dashboard and Indexer on a dedicated VM',
			'Connected a Wazuh agent with encrypted communication (port 1514)',
			'Automated agent reconnection via Bash script + crontab'
		],
		stack: [
			{ layerFr: 'OS', layerEn: 'OS', tech: 'Ubuntu Server 22.04 LTS' },
			{ layerFr: 'SIEM', layerEn: 'SIEM', tech: 'Wazuh 4.12 (Manager + Indexer + Dashboard)' },
			{ layerFr: 'Hardening', layerEn: 'Hardening', tech: 'AppArmor, auditd, sysctl' },
			{ layerFr: 'Pare-feu', layerEn: 'Firewall', tech: 'UFW + Fail2Ban' },
			{ layerFr: 'Authentification', layerEn: 'Authentication', tech: 'SSH par clé RSA 4096' },
			{ layerFr: 'Automatisation', layerEn: 'Automation', tech: 'Bash + crontab' }
		],
		sidebarTags: [
			'Wazuh Manager',
			'Wazuh Agent',
			'Wazuh Dashboard',
			'Ubuntu Server',
			'AppArmor',
			'Fail2Ban',
			'UFW',
			'auditd',
			'SSH',
			'Bash'
		],
		infoFr: ['Juin 2025', '2 semaines', 'Geneva Institute of Technology', 'Hackathon'],
		infoEn: ['June 2025', '2 weeks', 'Geneva Institute of Technology', 'Hackathon'],
		tags: ['Wazuh', 'Ubuntu', 'Windows Server', 'SIEM'],
		tagColor: 'cyan',
		links: [
			{
				labelFr: 'Guide installation Ubuntu',
				labelEn: 'Ubuntu install guide',
				href: 'https://hackmd.io/@1lZKDAoOSziryswPJhllxg/rykHFp8Qlx',
				icon: 'doc'
			},
			{
				labelFr: 'Guide Wazuh complet',
				labelEn: 'Full Wazuh guide',
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
		icon: 'azure',
		titleFr: 'Projets Azure — Infrastructure Cloud',
		titleEn: 'Azure Projects — Cloud Infrastructure',
		contextFr: '2025 · Projets école · Infrastructure Cloud',
		contextEn: '2025 · School projects · Cloud Infrastructure',
		summaryFr:
			'Déploiement de sites web dynamiques et architectures sécurisées (Bastion + VM privée + Azure Files) sur Microsoft Azure.',
		summaryEn:
			'Deployment of dynamic websites and secure architectures (Bastion + private VM + Azure Files) on Microsoft Azure.',
		bulletsFr: [
			'Déployé un site web PHP connecté à Azure Database for MySQL (Flexible Server)',
			'Architecture Bastion sécurisée : VM publique + VM privée isolée + Azure Files'
		],
		bulletsEn: [
			'Deployed a PHP website connected to Azure Database for MySQL (Flexible Server)',
			'Secure Bastion architecture: public VM + isolated private VM + Azure Files'
		],
		highlightsFr: [
			'VM Ubuntu + Nginx + PHP-FPM connectée à Azure Database for MySQL via SSL',
			'Dashboard PHP (CRUD) avec Bootstrap 5, Chart.js et protection CSRF',
			'Architecture Bastion : VM publique SSH/RDP + VM privée sans IP publique',
			'Partage Azure Files monté sur les deux VMs (SMB/CIFS + fstab), NSG segmentés'
		],
		highlightsEn: [
			'Ubuntu VM + Nginx + PHP-FPM connected to Azure Database for MySQL via SSL',
			'PHP dashboard (CRUD) with Bootstrap 5, Chart.js and CSRF protection',
			'Bastion architecture: public SSH/RDP VM + private VM with no public IP',
			'Azure Files share mounted on both VMs (SMB/CIFS + fstab), segmented NSGs'
		],
		stack: [
			{ layerFr: 'Cloud', layerEn: 'Cloud', tech: 'Microsoft Azure' },
			{ layerFr: 'VMs', layerEn: 'VMs', tech: 'Ubuntu Server 22.04 / 24.04' },
			{ layerFr: 'Base de données', layerEn: 'Database', tech: 'Azure Database for MySQL (Flexible Server)' },
			{ layerFr: 'Serveur web', layerEn: 'Web server', tech: 'Nginx + PHP-FPM' },
			{ layerFr: 'Stockage', layerEn: 'Storage', tech: 'Azure Files (SMB/CIFS)' },
			{ layerFr: 'Réseau', layerEn: 'Networking', tech: 'VNet, NSG, sous-réseaux, IP publiques' },
			{ layerFr: 'Bureau distant', layerEn: 'Remote desktop', tech: 'XRDP + XFCE' }
		],
		sidebarTags: [
			'Azure',
			'Ubuntu Server',
			'Nginx',
			'PHP-FPM',
			'MySQL',
			'Azure Files',
			'NSG',
			'XRDP',
			'XFCE',
			'SSH',
			'SCP'
		],
		infoFr: ['2025', 'Geneva Institute of Technology', 'Infrastructure Cloud'],
		infoEn: ['2025', 'Geneva Institute of Technology', 'Cloud Infrastructure'],
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
		icon: 'laravel',
		image: '/img/projects/luxeshop-banner.png',
		titleFr: 'Luxe Shop — E-commerce Fullstack',
		titleEn: 'Luxe Shop — Fullstack E-commerce',
		contextFr: 'Février 2026 · Projet école · Développement Fullstack',
		contextEn: 'February 2026 · School project · Fullstack Development',
		summaryFr:
			'Boutique en ligne complète : API REST Laravel 12 + SPA React 19 + Stripe Checkout, authentification Sanctum et thème sombre responsive.',
		summaryEn:
			'Full online store: Laravel 12 REST API + React 19 SPA + Stripe Checkout, Sanctum authentication and dark responsive theme.',
		bulletsFr: [
			'Boutique en ligne fullstack : Laravel 12 (API REST) + React 19 (SPA) + Stripe Checkout',
			'Panier persistant, 30 produits, authentification Sanctum, thème sombre responsive'
		],
		bulletsEn: [
			'Fullstack online store: Laravel 12 (REST API) + React 19 (SPA) + Stripe Checkout',
			'Persistent cart, 30 products, Sanctum auth, dark responsive theme'
		],
		highlightsFr: [
			'API REST Laravel 12 + authentification Sanctum (Bearer Token)',
			'SPA React 19 + React Router DOM 7, hooks, context, Axios',
			'Intégration Stripe Checkout : sessions de paiement, confirmation, webhooks',
			'Base MySQL (6 tables, relations Eloquent), panier persistant serveur'
		],
		highlightsEn: [
			'Laravel 12 REST API + Sanctum authentication (Bearer Token)',
			'React 19 SPA + React Router DOM 7, hooks, context, Axios',
			'Stripe Checkout integration: payment sessions, confirmation, webhooks',
			'MySQL database (6 tables, Eloquent relations), server-persistent cart'
		],
		stack: [
			{ layerFr: 'Backend', layerEn: 'Backend', tech: 'Laravel 12 (PHP 8.2+)' },
			{ layerFr: 'Frontend', layerEn: 'Frontend', tech: 'React 19 + React Router DOM 7' },
			{ layerFr: 'Authentification', layerEn: 'Authentication', tech: 'Laravel Sanctum (Bearer Token)' },
			{ layerFr: 'Paiement', layerEn: 'Payment', tech: 'Stripe Checkout (PHP SDK)' },
			{ layerFr: 'Base de données', layerEn: 'Database', tech: 'MySQL 8.x (6 tables)' },
			{ layerFr: 'HTTP Client', layerEn: 'HTTP Client', tech: 'Axios' },
			{ layerFr: 'Serveur local', layerEn: 'Local server', tech: 'XAMPP (Apache + MySQL)' }
		],
		sidebarTags: [
			'Laravel 12',
			'React 19',
			'Stripe',
			'MySQL',
			'Sanctum',
			'Axios',
			'PHP 8.2+',
			'JavaScript',
			'XAMPP'
		],
		infoFr: ['Février 2026', 'Geneva Institute of Technology', 'Développement Fullstack'],
		infoEn: ['February 2026', 'Geneva Institute of Technology', 'Fullstack Development'],
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
		icon: 'raspberry',
		titleFr: 'Hackathon IoT — Raspberry Pi + Python',
		titleEn: 'IoT Hackathon — Raspberry Pi + Python',
		contextFr: 'Mars 2025 · 1 semaine · Hackathon',
		contextEn: 'March 2025 · 1 week · Hackathon',
		summaryFr:
			"Prototype IoT end-to-end : interfaçage de capteurs sur Raspberry Pi, collecte et traitement des données en Python.",
		summaryEn:
			'End-to-end IoT prototype: sensor interfacing on Raspberry Pi, data collection and processing in Python.',
		bulletsFr: [
			'Développé un prototype IoT — interfaçage capteurs + collecte de données',
			"Programmé en Python la logique de traitement et d'affichage des données"
		],
		bulletsEn: [
			'Developed an IoT prototype — sensor interfacing + data collection',
			'Programmed in Python the data processing and display logic'
		],
		highlightsFr: [
			'Configuration du Raspberry Pi (Raspberry Pi OS, SSH, réseau)',
			'Connexion des capteurs sur les broches GPIO + script Python temps réel',
			'Traitement des données : filtrage, moyennes, détection de seuils',
			"Gestion robuste des erreurs de lecture capteur + boucle stable"
		],
		highlightsEn: [
			'Raspberry Pi setup (Raspberry Pi OS, SSH, network)',
			'Sensor wiring on GPIO pins + real-time Python script',
			'Data processing: filtering, averaging, threshold detection',
			'Robust sensor read error handling + stable loop'
		],
		stack: [
			{ layerFr: 'Hardware', layerEn: 'Hardware', tech: 'Raspberry Pi' },
			{ layerFr: 'OS', layerEn: 'OS', tech: 'Raspberry Pi OS (Debian)' },
			{ layerFr: 'Langage', layerEn: 'Language', tech: 'Python 3' },
			{ layerFr: 'Interfaçage', layerEn: 'Interfacing', tech: 'GPIO + capteurs' },
			{ layerFr: 'Accès distant', layerEn: 'Remote access', tech: 'SSH' }
		],
		sidebarTags: ['Raspberry Pi', 'Python', 'GPIO', 'Capteurs', 'SSH', 'Linux'],
		infoFr: ['Mars 2025', '1 semaine', 'Geneva Institute of Technology', 'Hackathon'],
		infoEn: ['March 2025', '1 week', 'Geneva Institute of Technology', 'Hackathon'],
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
		icon: 'vmware',
		titleFr: 'Administration VMware ESXi',
		titleEn: 'VMware ESXi Administration',
		contextFr: '2024 · Projet école · Infrastructure & Virtualisation',
		contextEn: '2024 · School project · Infrastructure & Virtualization',
		summaryFr:
			"Installation d'un hyperviseur VMware ESXi bare-metal, puis déploiement et administration de VMs Windows Server (AD DS) et Ubuntu (Apache).",
		summaryEn:
			'Bare-metal VMware ESXi hypervisor installation, then deployment and administration of Windows Server (AD DS) and Ubuntu (Apache) VMs.',
		bulletsFr: [
			'Installé et configuré un hyperviseur VMware ESXi sur serveur physique',
			'Déployé et administré des VMs Windows Server et Ubuntu (AD DS, Apache)'
		],
		bulletsEn: [
			'Installed and configured a VMware ESXi hypervisor on physical server',
			'Deployed and administered Windows Server and Ubuntu VMs (AD DS, Apache)'
		],
		highlightsFr: [
			'Installation ESXi bare-metal + configuration réseau (vSwitch, port groups)',
			'VM Windows Server avec Active Directory Domain Services',
			'VM Ubuntu Server avec serveur web Apache',
			'Administration via vSphere Client : snapshots, monitoring, datastores'
		],
		highlightsEn: [
			'Bare-metal ESXi install + network setup (vSwitch, port groups)',
			'Windows Server VM with Active Directory Domain Services',
			'Ubuntu Server VM with Apache web server',
			'vSphere Client administration: snapshots, monitoring, datastores'
		],
		stack: [
			{ layerFr: 'Hyperviseur', layerEn: 'Hypervisor', tech: 'VMware ESXi 7.x / 8.x' },
			{ layerFr: 'Client de gestion', layerEn: 'Management client', tech: 'vSphere Client (Web)' },
			{ layerFr: 'VM 1', layerEn: 'VM 1', tech: 'Windows Server 2019 / 2022' },
			{ layerFr: 'VM 2', layerEn: 'VM 2', tech: 'Ubuntu Server 22.04 LTS' },
			{ layerFr: 'Réseau', layerEn: 'Network', tech: 'vSwitch, Port Groups, VLAN' },
			{ layerFr: 'Stockage', layerEn: 'Storage', tech: 'Datastore local (VMFS)' }
		],
		sidebarTags: ['VMware ESXi', 'vSphere', 'Windows Server', 'Ubuntu', 'Active Directory', 'Apache'],
		infoFr: ['2024', 'Projet école', 'Infrastructure & Virtualisation', 'Geneva Institute of Technology'],
		infoEn: ['2024', 'School project', 'Infrastructure & Virtualization', 'Geneva Institute of Technology'],
		tags: ['VMware ESXi', 'Windows Server', 'Ubuntu'],
		tagColor: 'violet',
		links: []
	}
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(id: string): Project | undefined {
	return projects.find((p) => p.id === id);
}
