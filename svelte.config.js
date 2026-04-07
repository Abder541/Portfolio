import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: true,
			strict: true
		}),
		prerender: {
			handleMissingId: 'warn'
		},
		// Base path pour GitHub Pages : le repo s'appelle "Portfolio"
		// En dev : pas de base. En prod : /Portfolio
		paths: {
			base: process.argv.includes('dev') ? '' : '/Portfolio'
		}
	}
};

export default config;
