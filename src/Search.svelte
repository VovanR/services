<script>
  import {createEventDispatcher} from 'svelte';

  let search = '';

  const dispatch = createEventDispatcher();

  function handleChange() {
    dispatch('change', {
      value: search
    });
  }
</script>

<style>
  .search {
    margin-bottom: 20px;
  }

  .search__input {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid silver;
    padding: 6px 9px;
    border-radius: 3px;
  }

  .search__input:focus {
    border-color: #707070;
    outline: none;
  }
</style>

<div class="search">
  <input
    type="search"
    class="search__input"
    placeholder="Search"
    autofocus="autofocus"
    bind:value={search}
    on:input={handleChange}
  />
</div>
