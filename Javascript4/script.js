const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(searchInput.value, cities);
  const html = matchArray.map((place, index) => {
    const regex = new RegExp(searchInput.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${searchInput.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${searchInput.value}</span>`);
    return `
      <li data-index="${index}">
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
  currentIndex = -1;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('input', displayMatches);

let currentIndex = -1;

document.addEventListener('keydown', function(e) {
  const items = suggestions.querySelectorAll('li');
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    currentIndex = (currentIndex + 1) % items.length;
    highlightItem(items);
  } else if (e.key === 'ArrowUp') {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    highlightItem(items);
  }
});

function highlightItem(items) {
  items.forEach((item, i) => {
    item.classList.toggle('active', i === currentIndex);
  });
}
