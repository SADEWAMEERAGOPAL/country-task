let cl = console.log;

const load=document.getElementById("loader");
const contentEl = document.getElementById("content");


function loader(flag) {
    if (flag) {
        load.classList.remove("d-none");
        contentEl.classList.add("d-none");
    } else {
        load.classList.add("d-none");
        contentEl.classList.remove("d-none");
    }
}

const params = new URLSearchParams(window.location.search);
const CODE = params.get("code");

cl("Country code:", CODE);

const API_URL = `https://restcountries.com/v3.1/alpha/${CODE}`;

async function loadCountryData() {
  try {
    loader(true)
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("something went wrong!!!");
    }

    const data = await res.json();

    document.getElementById("officialName").innerText = data[0].name.common;
    document.getElementById("flagImg").src = data[0].flags.png;
    document.getElementById("capital").innerText = data[0].capital?.[0] || "N/A";
    document.getElementById("region").innerText = data[0].region || "N/A";
    document.getElementById("subRegion").innerText = data[0].subregion || "N/A";
    document.getElementById("population").innerText = data[0].population;
    document.getElementById("area").innerText = data[0].area;
    document.getElementById("languages").innerText = Object.values(data[0].languages||{}).join(", ");"N/A";
   
   
    //currency
    const curr = data[0].currencies? Object.values(data[0].currencies)
          .map(c => `${c.name} (${c.symbol || ""})`)
          .join(", ") : "N/A";

  document.getElementById("currencies").innerText = curr;

  
  
  //map
 document.getElementById("maplink").href=data[0].maps.googleMaps
 document.getElementById("maplink").innerText = "Open in Map";
  

 //border countries
 const bordersEl = document.getElementById("borders");

if (data[0].borders && data[0].borders.length) {
  const borderCodes = data[0].borders; 

  
  const borderRes = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`
  );

  if (!borderRes.ok) {
    
    bordersEl.innerText = borderCodes.join(" ");
  } else {
    const borderData = await borderRes.json();
    const links = borderData.map(c => {
      return `<a href="country.html?code=${c.cca3}">${c.name.common}</a>`;
    });

    bordersEl.innerHTML = links.join(" | ");
  }

} else {
  bordersEl.innerHTML = `<strong class="text-info">No Borders</strong>`;
}


  } catch (err) {
    cl(err);
  }finally{
    loader(false)
  }
}

loadCountryData();

document.getElementById("backBtn").addEventListener("click", () => {
  loader(true); 
  setTimeout(() => history.back(), 2500);
});