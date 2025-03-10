// Accessing a button element
const detailsButton = document.querySelector('button');
const countryName = document.querySelector('input');

detailsButton.addEventListener('click', async function () {
    const countName = countryName.value.trim(); // Remove leading/trailing spaces

    if (!isValidCountryName(countName)) {
        alert('Please enter a valid country name (no numbers, at least two letters).');
        return;
    }

    getInfo(countName).then(response => {
        if (response) {
            addInfo(response);
        } else {
            alert('Country not found. Please try again.');
        }
    });
});

// Function to validate country name
const isValidCountryName = (name) => {
    return /^[A-Za-z\s]{2,}$/.test(name); // Only letters and spaces, at least 2 characters
};

const getInfo = (countryName) =>
    fetch(`https://restcountries.com/v3.1/name/${countryName.toLowerCase()}`)
        .then(info => info.json())
        .then(data => data[0] || null) // Return first result or null if not found
        .catch(error => {
            console.warn('Error fetching country data:', error);
            return null;
        });

const getBorders = (acronym) =>
    fetch(`https://restcountries.com/v3.1/alpha/${acronym}`)
        .then(info => info.json())
        .then(data => data[0] || null)
        .catch(error => {
            console.warn('Error fetching border country data:', error);
            return null;
        });

const addInfo = async (results) => {
    const countryInfoSection = document.getElementById('country-info');
    countryInfoSection.innerHTML = ""; // Clear previous content

    const borderInfoSection = document.getElementById('bordering-countries');
    borderInfoSection.innerHTML = ""; // Clear previous border info

    if (!results) {
        alert('No data available for this country.');
        return;
    }

    var capital = document.createElement('p');
    capital.innerText = "Capital: " + (results.capital ? results.capital[0] : 'N/A');
    countryInfoSection.appendChild(capital);

    var pop = document.createElement('p');
    pop.innerText = "Population: " + (results.population || 'N/A');
    countryInfoSection.appendChild(pop);

    var region = document.createElement('p');
    region.innerText = "Region: " + (results.region || 'N/A');
    countryInfoSection.appendChild(region);

    var flag = document.createElement('img');
    flag.src = results.flags.png;
    flag.alt = "Flag of " + results.name.common;
    countryInfoSection.appendChild(flag);

    // Handle borders one by one without Promise.all()
    if (results.borders && results.borders.length > 0) {
        for (let i = 0; i < results.borders.length; i++) {
            const borderInfo = await getBorders(results.borders[i]); // Fetch one by one
            if (borderInfo) {
                var border = document.createElement('p');
                var borderFlag = document.createElement('img');
                border.innerText = borderInfo.name.common;
                borderFlag.src = borderInfo.flags.png;
                borderFlag.alt = "Flag of " + borderInfo.name.common;
                borderInfoSection.appendChild(border);
                borderInfoSection.appendChild(borderFlag);
            }
        }
    }
};
