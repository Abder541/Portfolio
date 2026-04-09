export type SkillLevel = 'beginner' | 'intermediate' | 'confident';

export interface Skill {
	nameFr: string;
	nameEn: string;
	level: SkillLevel;
}

export interface SkillCategory {
	id: string;
	icon: string;
	titleFr: string;
	titleEn: string;
	skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
	{
		id: 'os',
		icon: '🖥️',
		titleFr: "Systèmes d'exploitation",
		titleEn: 'Operating Systems',
		skills: [
			{ nameFr: 'Windows Client (10/11)', nameEn: 'Windows Client (10/11)', level: 'confident' },
			{
				nameFr: 'Windows Server (2016/2019)',
				nameEn: 'Windows Server (2016/2019)',
				level: 'intermediate'
			},
			{
				nameFr: 'Linux — Ubuntu / Ubuntu Server',
				nameEn: 'Linux — Ubuntu / Ubuntu Server',
				level: 'intermediate'
			},
			{ nameFr: 'Linux — Kali Linux', nameEn: 'Linux — Kali Linux', level: 'beginner' },
			{
				nameFr: 'Terminal / CLI (bash, cmd, PowerShell)',
				nameEn: 'Terminal / CLI (bash, cmd, PowerShell)',
				level: 'intermediate'
			}
		]
	},
	{
		id: 'virt',
		icon: '⚙️',
		titleFr: 'Virtualisation',
		titleEn: 'Virtualization',
		skills: [
			{
				nameFr: 'VMware ESXi (hyperviseur type 1)',
				nameEn: 'VMware ESXi (type 1 hypervisor)',
				level: 'intermediate'
			},
			{
				nameFr: 'vSphere Client (gestion web ESXi)',
				nameEn: 'vSphere Client (ESXi web management)',
				level: 'intermediate'
			},
			{
				nameFr: 'Création & gestion de VMs',
				nameEn: 'VM creation & management',
				level: 'confident'
			},
			{
				nameFr: 'Snapshots & clonage de VMs',
				nameEn: 'VM snapshots & cloning',
				level: 'intermediate'
			},
			{ nameFr: 'Réseau virtuel (vSwitch)', nameEn: 'Virtual network (vSwitch)', level: 'beginner' }
		]
	},
	{
		id: 'network',
		icon: '🌐',
		titleFr: 'Réseau',
		titleEn: 'Networking',
		skills: [
			{ nameFr: 'Modèle OSI (7 couches)', nameEn: 'OSI model (7 layers)', level: 'intermediate' },
			{
				nameFr: 'Adressage IP & sous-réseaux',
				nameEn: 'IP addressing & subnets',
				level: 'intermediate'
			},
			{
				nameFr: 'Notions Cisco CCNA (routage, switching)',
				nameEn: 'Cisco CCNA basics (routing, switching)',
				level: 'beginner'
			},
			{
				nameFr: 'Protocoles (TCP/IP, DNS, DHCP, SSH)',
				nameEn: 'Protocols (TCP/IP, DNS, DHCP, SSH)',
				level: 'intermediate'
			},
			{
				nameFr: 'Diagnostic réseau (ping, traceroute)',
				nameEn: 'Network diagnostics (ping, traceroute)',
				level: 'intermediate'
			}
		]
	},
	{
		id: 'cyber',
		icon: '🔐',
		titleFr: 'Cybersécurité',
		titleEn: 'Cybersecurity',
		skills: [
			{
				nameFr: 'Fondamentaux cybersécurité (CIA triad)',
				nameEn: 'Cybersecurity fundamentals (CIA triad)',
				level: 'intermediate'
			},
			{
				nameFr: 'SIEM Wazuh — déploiement & configuration',
				nameEn: 'SIEM Wazuh — deployment & configuration',
				level: 'intermediate'
			},
			{
				nameFr: "Wazuh — règles d'alertes & détection",
				nameEn: 'Wazuh — alert rules & detection',
				level: 'beginner'
			},
			{ nameFr: 'Analyse de logs système', nameEn: 'System log analysis', level: 'beginner' }
		]
	},
	{
		id: 'dev',
		icon: '💻',
		titleFr: 'Développement',
		titleEn: 'Development',
		skills: [
			{
				nameFr: 'Python (scripts, IoT, données)',
				nameEn: 'Python (scripts, IoT, data)',
				level: 'intermediate'
			},
			{ nameFr: 'HTML5 / CSS3', nameEn: 'HTML5 / CSS3', level: 'intermediate' },
			{
				nameFr: 'PHP (back-end basique)',
				nameEn: 'PHP (basic back-end)',
				level: 'beginner'
			},
			{
				nameFr: 'JavaScript (DOM, interactions)',
				nameEn: 'JavaScript (DOM, interactions)',
				level: 'beginner'
			},
			{ nameFr: 'SQL (SELECT, INSERT, JOIN)', nameEn: 'SQL (SELECT, INSERT, JOIN)', level: 'beginner' }
		]
	},
	{
		id: 'tools',
		icon: '🛠️',
		titleFr: 'Outils & autres',
		titleEn: 'Tools & Other',
		skills: [
			{
				nameFr: 'WordPress (thèmes, plugins)',
				nameEn: 'WordPress (themes, plugins)',
				level: 'intermediate'
			},
			{ nameFr: 'Git / GitHub (basique)', nameEn: 'Git / GitHub (basics)', level: 'beginner' },
			{
				nameFr: 'Raspberry Pi (hardware + software)',
				nameEn: 'Raspberry Pi (hardware + software)',
				level: 'beginner'
			},
			{
				nameFr: 'GenAI (ChatGPT, Copilot)',
				nameEn: 'GenAI (ChatGPT, Copilot)',
				level: 'intermediate'
			},
			{ nameFr: 'Suite Microsoft Office', nameEn: 'Microsoft Office Suite', level: 'confident' }
		]
	}
];

// Flat list of highlight skills for bento display
export const highlightSkills = [
	{ label: 'VMware ESXi', color: 'violet' as const },
	{ label: 'Wazuh SIEM', color: 'cyan' as const },
	{ label: 'Azure Cloud', color: 'violet' as const },
	{ label: 'Linux Ubuntu', color: 'green' as const },
	{ label: 'Windows Server', color: 'neutral' as const },
	{ label: 'Python', color: 'cyan' as const },
	{ label: 'TCP/IP / DNS', color: 'neutral' as const },
	{ label: 'Laravel + React', color: 'cyan' as const },
	{ label: 'Raspberry Pi', color: 'green' as const },
	{ label: 'Active Directory', color: 'neutral' as const }
];
