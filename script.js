// Accessing a button element
const detailsButton = document.querySelector('button');
const countryName = document.querySelector('input');

detailsButton.addEventListener('click', async function () {
    const countName = countryName.value.trim(); // Remove leading/trailing spaces
    if (!countName) {
        alert('Please enter a country name.');
        return;
    }
    const response = await getInfo(countName);
    if (response) {
        addInfo(response);
    } else {
        alert('Country not found. Please try again.');
    }
});

const getInfo = async (countryName) => {
    try {
        // Make country name case-insensitive by using toLowerCase
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName.toLowerCase()}`);
        const data = await response.json();
        if (data && data[0]) {
            return data[0];
        } else {
            return null; // No country found
        }
    } catch (error) {
        console.warn('Error fetching country data:', error);
        return null; // Return null in case of error
    }
};

const getBorders = async (acronym) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${acronym}`);
        const data = await response.json();
        if (data && data[0]) {
            return data[0];
        } else {
            return null;
        }
    } catch (error) {
        console.warn('Error fetching border country data:', error);
        return null;
    }
};

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
    capital.innerText = "Capital: " + (results.capital ? results.capital[0] : 'N/A'); // Capital is an array
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

    // Handle borders
    if (results.borders && results.borders.length > 0) {
        for (var i = 0; i < results.borders.length; i++) {
            const borderCode = results.borders[i];
            const borderInfo = await getBorders(borderCode);
            if (borderInfo) {
                var border = document.createElement('p');
                var borderFlag = document.createElement('img');
                border.innerText = borderInfo.name.common;
                if (borderInfo.flags && borderInfo.flags.png) {
                    borderFlag.src = borderInfo.flags.png;
                }
                borderFlag.alt = "Flag of " + borderInfo.name.common;

                borderInfoSection.appendChild(border);
                borderInfoSection.appendChild(borderFlag);
            } else {
                console.warn(`No data available for border: ${borderCode}`);
            }
        }
    } else {
        var noBordersMessage = document.createElement('p');
        noBordersMessage.innerText = "This country has no bordering countries.";
        borderInfoSection.appendChild(noBordersMessage);
    }
};
