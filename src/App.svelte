<script>
	import Header from './Header.svelte';
	import Container from './Container.svelte';
	import Services from './Services.svelte';
	import Footer from './Footer.svelte';

	export let name;
	export let siteURL;
</script>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	h1 {
		text-align: center;
		color: #1A237E;
		font-weight: normal;
	}
</style>

<Container>
	<div slot="header">
		<Header
			siteURL={siteURL}
		/>
	</div>

	<div slot="content">
		<Services/>
	</div>

	<div slot="footer">
		<Footer/>
	</div>
</Container>
