<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import Marquee from '$lib/components/sections/Marquee.svelte';
	import BentoGrid from '$lib/components/sections/BentoGrid.svelte';
	import ProjectsGrid from '$lib/components/sections/ProjectsGrid.svelte';
	import Timeline from '$lib/components/sections/Timeline.svelte';
	import CTAContact from '$lib/components/sections/CTAContact.svelte';
</script>

<!-- Section Hero 3D + texte + CTA -->
<Hero />

<!-- Bandeau défilant : stats et faits clés -->
<Marquee />

<!-- Vitrine compétences (bento grid) -->
<BentoGrid />

<!-- 3 projets vedettes -->
<ProjectsGrid />

<!-- Chronologie compacte -->
<Timeline />

<!-- CTA contact pleine largeur -->
<CTAContact />
