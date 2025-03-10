// Accessing a button element
const detailsButton = document.querySelector('button');

const countryName = document.querySelector('input');

detailsButton.addEventListener('click', async function () {
    const countName = countryName.value;
    const response = await getInfo(countName);
    addInfo(response);
});

const getInfo = (countryName) => fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(info => info.json())
    .then(r => {
        console.log(r[0]);
        return r[0];
    })
    .catch(error => console.warn(error));

const getBorders = (acronym) => fetch(`https://restcountries.com/v3.1/alpha/${acronym}`)
    .then(info => info.json())
    .then(r => {
        console.log(r[0]);
        return r[0];
    })
    .catch(error => console.warn(error));

const addInfo = async (results) => {
    const countryInfoSection = document.getElementById('country-info');
    countryInfoSection.innerHTML = ""; // Clear previous content

    const borderInfoSection = document.getElementById('bordering-countries');
    borderInfoSection.innerHTML = "";

    var capital = document.createElement('p');
    capital.innerText = "Capital: " + results.capital[0]; // Capital is an array
    countryInfoSection.appendChild(capital);

    var pop = document.createElement('p');
    pop.innerText = "Population: " + results.population;
    countryInfoSection.appendChild(pop);

    var region = document.createElement('p');
    region.innerText = "Region: " + results.region;
    countryInfoSection.appendChild(region);

    var flag = document.createElement('img');
    flag.src = results.flags.png;
    flag.alt = "Flag of " + results.name.common;
    countryInfoSection.appendChild(flag);

    for (var i = 0; i < results.borders.length; i++) {
        var border = document.createElement('p');
        var borderFlag = document.createElement('img');

        border.innerText = results.borders[i];
        const borderInfo = await getBorders(results.borders[i]);
        borderFlag.src = borderInfo.flags.png;

        borderInfoSection.appendChild(border);
        borderInfoSection.appendChild(borderFlag);
    }
}

