<script>
	import Header from './Header.svelte';
	import Container from './Container.svelte';
	import Tags from './Tags.svelte';
	import Services from './Services.svelte';
	import Footer from './Footer.svelte';

	import {onMount} from 'svelte';
	import {fetchServices} from './services';
	import {fetchTags} from './tags';

	export let servicesURL;
	export let tagsURL;
	export let servicesBlackList;

	let services = [];
	let tags = [];

	function collectUsedTags(services) {
		const usedTags = new Set();

		services.forEach(service => {
			service.tags.forEach(tag => {
				usedTags.add(tag);
			});
		});

		return usedTags;
	}

	onMount(async () => {
		const allServices = await fetchServices(servicesURL);
		services = allServices.filter(service => {
			return !servicesBlackList.includes(service.id);
		});

		const allTags = await fetchTags(tagsURL);

		const usedTagsSet = collectUsedTags(services);
		tags = allTags.filter(tag => usedTagsSet.has(tag.value))
	});

	let activeTagsMap = {};

	function onChangeActiveTags({detail: {value}}) {
		activeTagsMap = value
	}

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
		<Tags
			tags="{tags}"
			on:change="{onChangeActiveTags}"
		/>

		<Services
			services="{services}"
			activeTagsMap="{activeTagsMap}"
		/>
	</div>

	<div slot="footer">
		<Footer/>
	</div>
</Container>
