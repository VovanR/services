<script>
  import Icon from './Icon.svelte'

  export let activeTagsMap;
  export let services = [];
  export let search;

  $: filteredServices = filterServices(services, activeTagsMap, search)

  function isHidden(service) {
    return !isVisible(service);
  }

  function isVisible(service) {
    return service.tags.some(tag => activeTagsMap[tag] === true);
  }

  function isFalsy(value) {
    return !value;
  }

  function filterServices(services, activeTagsMap, search) {
    const allTagsActive = Object.values(activeTagsMap).every(isFalsy)

    if (
      allTagsActive &&
      search === ''
    ) {
      return services
    }

    let filtered = services

    if (allTagsActive === false) {
      filtered = services.filter(isVisible)
    }

    if (search !== '') {
      // From 'jspt' makes 'j.*s.*p.*t' to match 'JavaScript'
      const pattern = search.split('').join('.*')
      const regexp = new RegExp(pattern, 'i')

      filtered = filtered.filter(service => regexp.test(service.name))
    }

    return filtered
  }
</script>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .services {
    --items-in-line: 4;

    display: grid;
    grid-template-columns: repeat(var(--items-in-line), 1fr);
  }

  .services__loading {
    color: transparent;
    grid-column-start: 1;
    grid-column-end: -1;
    text-align: center;
    min-height: 802px;
  }

  @media (max-width: 740px) {
    .services {
      --items-in-line: 3;
    }
  }

  @media (max-width: 650px) {
    .services {
      --items-in-line: 2;
    }
  }

  @media (max-width: 420px) {
    .services {
      --items-in-line: 1;
    }
  }

  .service {
    --card-background-color: hsla(0, 0%, 100%, 1);
    --icon-size: 32px;

    display: grid;
    position: relative;
    animation-name: fadeIn;
    animation-duration: 250ms;
  }

  .service__link {
    display: block;
    text-decoration: none;
    padding: 15px 15px 25px;
    border-radius: 5px;
    background-color: var(--card-background-color);
    transition: background-color 150ms ease;
  }

  .service__link:hover {
    --card-background-color: hsla(0, 0%, 96%, 1);
  }

  .service__link:focus {
    --card-background-color: hsla(0, 0%, 96%, 1);
    outline: none;
  }

  .service__icon-placeholder {
    width: var(--icon-size);
    height: var(--icon-size);
    margin: 10px 40px 15px;
  }

  .service__icon {
    width: 100%;
    height: 100%;
  }

  .service__name {
    font-weight: 300;
    font-size: 1em;
    line-height: 1.2;
    color: inherit;
    margin: 0 0 .15em;
  }

  .service__description {
    color: #90a4ae;
    font-size: smaller;
    line-height: 1.2;
  }

  .service__source-link {
    letter-spacing: 0.12em;
    font-size: 0.6em;
    position: absolute;
    right: 0;
    bottom: 0;
    padding-right: 15px;
    padding-bottom: 5px;
    opacity: 0;
    transition: opacity 250ms 500ms ease;
  }

  .service:hover .service__source-link {
    opacity: 0.5;
  }

  .service .service__source-link:hover {
    transition: opacity 150ms 0ms ease;
    opacity: 1;
  }

  /* Popular */
  .service.popular .service__icon-placeholder {
    position: relative;
  }

  .service.popular .service__icon-placeholder::after {
    display: block;
    content: '★';
    color: #ffc107;
    position: absolute;
    left: 100%;
    top: -10px;
    margin-left: 13px;
  }

  @media (max-width: 420px) {
    .service__link {
      display: grid;
      padding: 10px 10px 18px 10px;
      grid-template-columns: 50px auto;
      grid-template-areas: "icon name"
                           "icon description";
    }

    .service__icon-placeholder {
      grid-area: icon;
      margin: 0;
    }

    .service__name {
      grid-area: name;
    }

    .service__description {
      grid-area: description;
    }

    .service__source-link {
      padding-right: 10px;
      padding-bottom: 3px;
    }

    /* Popular */
    .service.popular .service__icon-placeholder::after {
      margin-left: 0;
    }
  }
</style>

<div class="services">
  {#if filteredServices}
    {#each filteredServices as service, i (service.id)}
      <div
        class="service"
        class:popular={service.popular}
      >
        <a
          class="service__link"
          href={service.href}
        >
          <figure class="service__icon-placeholder">
            <Icon
              class="service__icon"
              url="{service.icon}"
            />
          </figure>

          <h2 class="service__name">
            {service.name}
          </h2>

          <div class="service__description">
            {service.desc}
          </div>
        </a>

        <a
          class="service__source-link"
          href={service.source}
          tabindex="-1"
        >
          Source code
        </a>
      </div>
    {/each}
  {:else}
    <div class="services__loading">
      Loading Services...
    </div>
  {/if}
</div>
