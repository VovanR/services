<script>
	import {onMount} from 'svelte';
	import {createEventDispatcher} from 'svelte';

	let tags = [];

	const dispatch = createEventDispatcher();

	function processResponseJSON(tags) {
		return Object.entries(tags).reduce((acc, [key, value]) => {
			acc.push({
				label: value,
				value: key,
				active: false,
			});

			return acc;
		}, []);
	}

	onMount(async () => {
		const response = await fetch('https://vovanr.com/services-json/src/tags.json');
		const tagsJSON = await response.json();
		tags = processResponseJSON(tagsJSON);
	});

	function getTagsMap() {
		return tags.reduce((acc, tag) => {
			acc[tag.value] = tag.active;

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
	.tags {
		margin-bottom: 20px;
	}

	.tags__loading {
		text-align: center;
	}

	.tag {
		display: inline-flex;
		align-items: center;
		margin: 2px 10px;
		cursor: pointer;
		user-select: none;
	}

	.tag__checkbox {
		margin-right: 5px;
		cursor: inherit;
	}

	.active {
		color: #3304ff;
	}
</style>

<div class="tags">
	{#each tags as tag (tag.value)}
		<label
			class="tag"
			class:active="{tag.active}"
		>
			<input
				type="checkbox"
				class="tag__checkbox"
				bind:checked={tag.active}
				on:change={handleChange}
			/>

			<span class="tag__name">
				{tag.label}
			</span>
		</label>
	{:else}
		<p class="tags__loading">Loading Tags...</p>
	{/each}
</div>
