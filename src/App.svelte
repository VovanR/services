<script>
  import Search from './Search.svelte';
  import Tags from './Tags.svelte';
  import Services from './Services.svelte';

  import {onMount} from 'svelte';
  import {fetchServices} from './services';
  import {fetchTags} from './tags';

  export let servicesURL;
  export let tagsURL;
  export let servicesBlackList;
  export let popularServices;

  const popularServicesSet = new Set(popularServices);

  let services = [];
  let tags = [];
  let search = '';

  function collectUsedTags(services) {
    const usedTags = new Set();

    services.forEach(service => {
      service.tags.forEach(tag => {
        usedTags.add(tag);
      });
    });

    return usedTags;
  }

  function filterBlacklist(service) {
    return !servicesBlackList.includes(service.id);
  }

  function processPopular(service) {
    return {
      ...service,
      popular: popularServicesSet.has(service.id),
    };
  }

  onMount(async () => {
    const allServices = await fetchServices(servicesURL);
    services = allServices
      .filter(filterBlacklist)
      .map(processPopular);

    const allTags = await fetchTags(tagsURL);

    const usedTagsSet = collectUsedTags(services);
    tags = allTags.filter(tag => usedTagsSet.has(tag.value))
  });

  let activeTagsMap = {};

  function onChangeSearch({detail: {value}}) {
    search = value
  }

  function onChangeActiveTags({detail: {value}}) {
    activeTagsMap = value
  }
</script>

<style>
</style>

<section class="services-container">
  <Search
    bind:search={search}
    on:change="{onChangeSearch}"
  />

  <Tags
    tags="{tags}"
    on:change="{onChangeActiveTags}"
  />

  <Services
    services="{services}"
    activeTagsMap="{activeTagsMap}"
    search="{search}"
  />
</section>
