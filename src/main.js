import App from './App.svelte';

const SERVICES_JSON_PROJECT_URL = 'https://vovanr.com/services-json';

const app = new App({
  target: document.querySelector('#services-app-container'),
  props: {
    servicesURL: `${SERVICES_JSON_PROJECT_URL}/dist/services.json`,
    tagsURL: `${SERVICES_JSON_PROJECT_URL}/src/tags.json`,
    servicesBlackList: [
      'notes',
    ],
  }
});

export default app;
