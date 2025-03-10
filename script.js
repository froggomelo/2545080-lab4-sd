fetch('https://restcountries.com/v3.1/name/Canada')
.then(info => info.json())
.then(r => {
    console.log(r);
    addInfo(r);
})
.catch(error => console.warn(error));

const addInfo = (results) => {
    var capital = document.createElement('p');
    capital.innerText = results.capital;
    document.getElementById('country-info').appendChild(capital);
}

