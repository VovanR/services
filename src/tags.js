function processResponseJSON(tags) {
  return Object.entries(tags).reduce((acc, [key, value]) => {
    acc.push({
      label: value,
      value: key,
    });

    return acc;
  }, []);
}

function fetchTags(url) {
  return fetch(url)
    .then(response => response.json())
    .then(processResponseJSON);
}

export {
  fetchTags,
}
