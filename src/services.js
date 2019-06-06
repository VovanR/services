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

function filterEnabled(services) {
	return services.filter(isEnabled);
}

function fetchServices(url) {
	return fetch(url)
		.then(response => response.json())
		.then(processResponseJSON)
		.then(filterEnabled);
}

export {
	fetchServices,
}
