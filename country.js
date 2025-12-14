const flagImage = document.querySelector('.country-details img')
const countryTitle = document.querySelector('.details-text-container h1')
const nativeName = document.querySelector('.native-name')
const popuation = document.querySelector('.popuation')
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top-level-domain');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');
const borderCountries = document.querySelector('.border-countries');
const themeChange = document.querySelector('.theme-change');
const themeText = themeChange.querySelector('.theme-change span');
const themeIcon = themeChange.querySelector('.theme-change i');

const countryName = new URLSearchParams(location.search).get('name')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        console.log(country);
        flagImage.src = country.flags.svg;
        countryTitle.textContent = country.name.common;
        if (country.name.nativeName) {
            nativeName.textContent = Object.values(country.name.nativeName)[0].common;
        } else {
            nativeName.textContent = country.name.common;
        }
        popuation.textContent = country.population.toLocaleString('en-IN');
        region.textContent = country.region;
        if (country.subregion) {
            subRegion.textContent = country.subregion;
        }
        if (country.capital) {
            capital.textContent = country.capital[0];
        }
        topLevelDomain.textContent = country.tld.join(', ');
        if (country.currencies) {
            currencies.textContent = Object.values(country.currencies).map((currency) => currency.name).join(', ');
        }
        if (country.languages) {
            languages.textContent = Object.values(country.languages).join(', ');
        }

        // Border
        if (country.borders) {
            country.borders.forEach(border => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        // console.log(borderCountry);
                        const borderCountryTag = document.createElement('a');
                        borderCountryTag.textContent = borderCountry.name.common;
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        console.log(borderCountryTag);
                        borderCountries.append(borderCountryTag)
                    })
            });
        }
    })

// Dark & Light Mode

function updateThemeUI(isDark) {
  document.body.classList.toggle('dark', isDark);

  themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';

  themeIcon.className = isDark
    ? 'fa-solid fa-sun'
    : 'fa-solid fa-moon';

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initial load
const savedTheme = localStorage.getItem('theme');
updateThemeUI(savedTheme === 'dark');

// Toggle on click
themeChange.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  updateThemeUI(isDark);
});