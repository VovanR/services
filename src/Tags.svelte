<script>
  import {createEventDispatcher} from 'svelte';

  export let tags = [];
  let activeTag = 'all';

  const dispatch = createEventDispatcher();

  function getTagsMap() {
    return tags.reduce((acc, tag) => {
      acc[tag.value] = tag.value === activeTag;

      return acc;
    }, {});
  }

  function handleChange() {
    dispatch('change', {
      value: getTagsMap()
    });
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

  .tags {
    margin-bottom: 20px;
  }

  .tags__loading {
    color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
  }

  .tag {
    --background-color: hsla(0, 0%, 100%, 1);

    display: inline-flex;
    align-items: center;
    padding: 2px 10px;
    cursor: pointer;
    user-select: none;
    background-color: var(--background-color);
    border-radius: 3px;
    transition: background-color 150ms ease;
    animation-name: fadeIn;
    animation-duration: 250ms;
  }

  .tag:hover {
    --background-color: hsla(0, 0%, 96%, 1);
  }

  .tag__radio {
    display: none;
    margin-right: 5px;
    cursor: inherit;
  }

  .active {
    --background-color: hsla(0, 0%, 96%, 1);
    color: #3304ff;
  }
</style>

<div class="tags">
  {#if tags.length > 0}
    <label
      class="tag tag_name_all"
      class:active="{activeTag === 'all'}"
    >
      <input
        type="radio"
        class="tag__radio"
        value="all"
        bind:group={activeTag}
        on:change={handleChange}
      />

      <span class="tag__name">
        Все
      </span>
    </label>
  {/if}

  {#each tags as tag (tag.value)}
    <label
      class="tag"
      class:active="{tag.value === activeTag}"
    >
      <input
        type="radio"
        class="tag__radio"
        value="{tag.value}"
        bind:group={activeTag}
        on:change={handleChange}
      />

      <span class="tag__name">
        {tag.label}
      </span>
    </label>
  {:else}
    <div class="tags__loading">
      Loading Tags...
    </div>
  {/each}
</div>
