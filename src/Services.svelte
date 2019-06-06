<script>
	import {onMount} from 'svelte';

	export let activeTagsMap;

	let services = [];

	function processResponseJSON(services) {
		return services.map(service => {
			const url = service.href.replace(/github\.io/, 'com');
			return {
				...service,
				href: url,
				icon: service.icon ? `${url}${service.icon}` : null,
			};
		});
	}

	function isEnabled(service) {
		return service.disabled !== true;
	}

	onMount(async () => {
		const response = await fetch('https://vovanr.com/services-json/dist/services.json');
		const servicesJSON = await response.json();
		services = processResponseJSON(servicesJSON);
		services = services.filter(isEnabled);
	});

	function isHidden(service) {
		return !isVisible(service);
	}

	function isVisible(service) {
		return service.tags.some(tag => activeTagsMap[tag] === true);
	}

	function isFalsy(value) {
		return !value;
	}

	function filterServices(services) {
		if (Object.values(activeTagsMap).every(isFalsy)) {
			return services
		}
		return services.filter(isVisible)
	}
</script>

<style>
	.services {
		--items-in-line: 4;

		display: grid;
		grid-template-columns: repeat(var(--items-in-line), 1fr);
	}

	.services__loading {
		text-align: center;
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
	}

	.service:hover {
		--card-background-color: hsla(0, 0%, 96%, 1);
	}

	.service__link {
		display: block;
		text-decoration: none;
		padding: 15px 15px 25px;
		border-radius: 5px;
		background-color: var(--card-background-color);
		transition: background-color 150ms ease;
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

	.service__icon::after {
		content: '';
		color: silver;
		background-color: hsla(0, 0%, 98%, 1);
		display: block;
		width: var(--icon-size);
		height: var(--icon-size);
		box-shadow: 0 0 0 1px hsla(0, 0%, 88%, 1);
		border-radius: 50%;
	}

	.service__name {
		font-weight: 300;
		font-size: 1em;
		line-height: 1.2;
		color: inherit;
		margin: 0 0 .15em;
	}

	.service__link:hover .service__name {
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
		right: 15px;
		bottom: 5px;
		visibility: hidden;
		opacity: 0;
	}

	.service:hover .service__source-link {
		transition: opacity 250ms ease, visibility 250ms ease;
		opacity: 0.5;
		visibility: visible;
	}

	.service:hover .service__source-link:hover {
		opacity: 1;
	}

	.hidden {
		display: none;
	}
</style>

<div class="services">
	{#each filterServices(services) as service (service.id)}
		<div class="service">
			<a
				class="service__link"
				href={service.href}
			>
				<figure class="service__icon-placeholder">
					<img
						class="service__icon"
						src={service.icon}
						alt=""
					>
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
			>
				Исходный код
			</a>
		</div>
	{:else}
		<p class="services__loading">Loading Services...</p>
	{/each}
</div>
