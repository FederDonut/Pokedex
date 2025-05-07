// Ausschließlich Pokemon der ersten Generation werden abgefragt 
//let PokeNames =[];
const BASE_URL ="https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"
const IMG_URL ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"



function init(){
    
    fetchBaseAPI();
    
    
    
}

async function fetchBaseAPI(){
    try {
        let response = await fetch(BASE_URL);
        if(response.ok){
            let responseAsJson = await response.json();
            console.log("API Zugriff erfolgreich");
            //console.log(responseAsJson);
            let pokeObjekt = responseAsJson.results;
            //console.log(pokeObjekt);
            addPokemonToArray(pokeObjekt);
            renderPokemon()
            pokeCounter();
            
        }else{
            const errorInfo = await response.text();
            console.log("Fehlermeldung des Servers: ", errorInfo);
        }
    } catch (error) {
        console.error("Fehler beim der API abfrage -> BASE_URL " )
        
        
    }
}

// Namen und weiterführende URLs in Array speichern
function addPokemonToArray(pokeObjekt){
    let pokeName = Object.keys(pokeObjekt);
    for(index = 0; index < pokeName.length; index ++){
        PokeNames.push(
            {  
                name : pokeObjekt[index].name,
                url : pokeObjekt[index].url,
            }
        )
        
    }
}


function renderPokemon(){
    let contentRef = document.getElementById('content');
    contentRef.innerHTML="";
    for(i = 0; i < PokeNames.length; i ++){
        const name = PokeNames[i].name;
        contentRef.innerHTML += htmlLayout(i,name);
        
    }
};


function pokeCounter(){//Experimentell
    for(let Nr = 1; Nr <= PokeNames.length; Nr++){
        console.log(Nr);
    }
}


