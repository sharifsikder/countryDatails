const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const divElement = document.getElementById('country-container');
const  countryDatas = document.getElementById('country-details');
const spinner = document.getElementById('spinner');
spinner.style.display = 'none';
const error = document.getElementById('error');


// const errors = document.getElementById('errors');
// error.style.display = 'none';
// errors.style.display = 'none'
searchBtn.addEventListener('click', function(){
    spinner.style.display = 'block';

    const search = searchInput.value;
    searchInput.value = '';
    if(search === ''){
        // error.style.display = 'block';
        // errors.style.display = 'none'
        error.innerText = 'Search field connot be empty';
        spinner.style.display = 'none';
        return;
    }
    divElement.textContent = "";
    countryDatas.textContent = "";
    
  
  
    const url = `https://restcountries.eu/rest/v2/name/${search}`;   
    fetch(url)
    .then(res => res.json())
    .then(data => displayCountry(data))
})


const displayCountry = (countryArray) => {
    spinner.style.display = 'none';
    console.log(countryArray)
    if(countryArray.status === 404){
    
        error.innerText = 'No Result Found';
        spinner.style.display = 'none';
        // errors.style.display = 'block'
    }
    else{
        error.innerText = '';
        spinner.style.display = 'none';
        // errors.style.display = 'none'
    }
    // error.style.display = 'none';

 
   
  
    countryArray.forEach(item => {
        console.log(item)
        const div = document.createElement('div');
        div.classList.add('col-md-3')

        div.innerHTML = `<div class="rounded overflow-hidden border p-2">
          <img
            src="${item.flag}"
            class="w-100"
            alt=""
          />
        </div>
        
        <div
          class="
            py-2
            d-flex
            justify-content-between
            align-items-center
            d-md-block
            text-md-center
          "
        >
          <h1>${item.name}</h1>
          <button onclick="countryDetails('${item.alpha2Code}')" class="btn btn-dark">Learn More</button>
        </div>
      `;
      divElement.appendChild(div)
    })

}

const countryDetails = (countryData) => {
    countryDatas.textContent = "";
    
    
    fetch(`https://restcountries.eu/rest/v2/alpha/${countryData}`)
    .then(res => res.json())
    .then(data => countryInfo(data))
}

const countryInfo = (info) => {
    console.log(info)
  
  
    const div = document.createElement('div')
    div.classList.add('col-md-5')
    div.innerHTML = `
   
          <h1>${info.name}</h1>
          <p>Capital : ${info.capital}</p></p>
          <p>Currencies Name : ${info.currencies[0].name}</p>
          <p>Currencies Symbol : ${info.currencies[0].symbol}</p>
       `;
       countryDatas.appendChild(div)
}