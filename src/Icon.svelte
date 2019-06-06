<script>
  export let className = '';
  export let url;
  let loaded = false;

  function fetchServiceSrcIcon(iconURL) {
    return new Promise((resolve, reject) => {
      if (iconURL === null) {
        reject();
        return;
      }

      fetch(iconURL)
        .then(resp => {
          if (resp.ok) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(() => reject());
    });
  }

  let promise = fetchServiceSrcIcon(url);
</script>

<style>
  .icon {
  }

  .icon__image {
  }

  .icon__loading,
  .icon__empty {
    display: block;
    color: silver;
    background-color: hsla(0, 0%, 98%, 1);
    width: var(--icon-size);
    height: var(--icon-size);
    border: 1px solid hsla(0, 0%, 88%, 1);
    border-radius: 50%;
  }
</style>

<div class="icon">
  {#await promise}
    <span class="icon__loading"></span>
  {:then }
    <img class="icon__image" src="{url}" alt=""/>
  {:catch }
    <span class="icon__empty"></span>
  {/await}
</div>
