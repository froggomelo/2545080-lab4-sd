fetch('https://restcountries.com/v3.1/all')
.then(info => info.json())
.then(r => {
    addInfo(r);
    console.log(r);
})
.catch(error => console.warn(error));

const addInfo = (results) => {
    var capital = document.createElement('p');
    capital.innerText = results.capital;
    document.getElementById('country-info').appendChild(capital);
}