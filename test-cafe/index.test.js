import {Selector, RequestMock, RequestLogger} from 'testcafe';

/* eslint-disable new-cap */
const appContainerElement = Selector('#services-app-container');
const tagsElement = Selector('.tags');
const servicesElement = Selector('.services');
/* eslint-enable new-cap */

const testServicesJSON = [
  {
    "id": "time-progress",
    "name": "Time Progress",
    "desc": "Time statistics",
    "href": "https://vovanr.github.io/time-progress",
    "source": "https://github.com/VovanR/time-progress",
    "date": "2019-04-19",
    "tags": [
      "date",
      "productivity",
      "statistics",
      "time"
    ]
  },
  {
    "id": "string-cases",
    "name": "String Cases",
    "desc": "Convert variable name to various cases",
    "href": "https://vovanr.github.io/string-cases",
    "source": "https://github.com/VovanR/string-cases",
    "date": "2019-04-01",
    "icon": "/logo.svg",
    "tags": [
      "converter",
      "development",
      "text"
    ]
  },
  {
    "id": "time-calculator",
    "name": "Time Calculator",
    "desc": "Calculate time durations",
    "href": "https://vovanr.github.io/time-calculator",
    "source": "https://github.com/VovanR/time-calculator",
    "date": "2019-01-30",
    "icon": "/logo.svg",
    "tags": [
      "calculator",
      "time"
    ]
  },
];

const testTagsJSON = {
  calculator: 'calculator',
  converter: 'converter',
  date: 'date',
  development: 'development',
  productivity: 'productivity',
  statistics: 'statistics',
  text: 'text',
};

const mockServices = RequestMock()
  .onRequestTo('https://vovanr.com/services-json/dist/services.json')
  .respond(testServicesJSON, 200, {'access-control-allow-origin': '*'})
  .onRequestTo('https://vovanr.com/services-json/src/tags.json')
  .respond(testTagsJSON, 200, {'access-control-allow-origin': '*'});

// eslint-disable-next-line no-unused-expressions
fixture`Getting Started`
  .page`http://localhost:8080`;

test('should have application container', async t => {
  await t
    .expect(appContainerElement.exists).ok();
});

test('should build tags container', async t => {
  await t
    .expect(tagsElement.exists).ok();
});

test('should build services container', async t => {
  await t
    .expect(servicesElement.exists).ok();
});

test
  .requestHooks(mockServices)
  ('should render service items', async t => {
    const servicesCount = testServicesJSON.length;

    await t
      .expect(servicesElement.find('.service').count).eql(servicesCount)
      .expect(servicesElement.find('.service').nth(0).textContent).contains('Time Progress');
  });

test
  .requestHooks(mockServices)
  ('should render "Popular" mark', async t => {
    await t
      .expect(servicesElement.find('.service').nth(0).textContent).contains('Time Progress')
      .expect(servicesElement.find('.service').nth(0).hasClass('popular')).notOk()
      .expect(servicesElement.find('.service').nth(2).textContent).contains('Time Calculator')
      .expect(servicesElement.find('.service').nth(2).hasClass('popular')).ok();
  });

test('should render "All" tag at first position', async t => {
  await t
    .expect(tagsElement.find('.tag').textContent).contains('All');
});

test
  .requestHooks(mockServices)
  ('should render tags', async t => {
  const tagsCount = Object.keys(testTagsJSON).length;
  // Tags + "All" tag
  const allTagsCount = tagsCount + 1;

  await t
    .expect(tagsElement.find('.tag').count).eql(allTagsCount);
});

test
  .requestHooks(mockServices)
  ('should add "active" class to selected tag', async t => {
  const textTag = tagsElement.find('.tag').withText('text');

  await t
    .expect(textTag.hasClass('active')).notOk()
    .click(textTag)
    .expect(textTag.hasClass('active')).ok();
});

test
  .requestHooks(mockServices)
  ('should filter selected services', async t => {
  const textTag = tagsElement.find('.tag').withText('text');

  await t
    .expect(servicesElement.find('.service').count).eql(3)
    .click(textTag)
    .expect(servicesElement.find('.service').count).eql(1)
    .expect(servicesElement.find('.service').textContent).contains('String Cases');
});

test
  .requestHooks(mockServices)
  ('should hide loading message after data loaded', async t => {
  const tagsLoadingMessage = tagsElement.find('.tags__loading');
  const servicesLoadingMessage = servicesElement.find('.services__loading')

  await t
    .expect(tagsLoadingMessage.exists).notOk()
    .expect(servicesLoadingMessage.exists).notOk();
});
