let cl= console.log;
const load=document.getElementById("loader");
const contentEl = document.getElementById("content");
const  countriesRow=document.getElementById('countriesRow')

function loader(flag) {
    if (flag) {
        load.classList.remove("d-none");
    } else {
        load.classList.add("d-none");
    }
}

//https://restcountries.com/v3.1/all?fields=name,cca2,flags,region

const BASE_URL=`https://restcountries.com/v3.1/all`;

async  function fetchAllcotrys(){
    try{
         loader(true)
        let COUNTRY_URL= `${BASE_URL}?fields=name,cca2,flags,region`;

        let res= await fetch(COUNTRY_URL, {
            method: 'GET',
            body: null,
        })

        let data= await res.json()

        if(!res.ok){
            throw new Error(`something went wrong`)
        }
        cl(data)
        data.map(c=>{
            const col= document.createElement('div');
            col.className=`col-12 col-sm-6 col-md-4 col-lg-3 mb-3`
            col.innerHTML=`<div class="card  countryCard shadow-sm h-100" role="button"  data-code="${c.cca2}">
       <img 
      src="${c.flags.png}" 
      class="card-img-top" 
      alt="${c.flags.alt}"
      title="${c.flags.alt}"
      loading= "lazy"
      data-code= "${c.cca2}"
    >
    <div class="card-body text-center">
      <h5 class="card-title mb-1">${c.name.common||c.name.official}</h5>
      <p class="card-text text-muted mb-0">code: ${c.cca2}</p>
    </div>
  </div>`

   col.addEventListener("click", ()=>{
    window.location.href=`country.html?code=${c.cca2}`
   })
  countriesRow.append(col)

        })

    }catch(err){
       cl(err)
    }finally{
        loader(false)
    }
}

fetchAllcotrys()


