// Ausschließlich Pokemon der ersten Generation werden abgefragt 
const BASE_URL ="https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"

function init(){
    console.log("connect");
    fetchAPI();
}

async function fetchAPI(){
    try {
        let response = await fetch(BASE_URL);
        if(response.ok){
            let responseAsJson = await response.json();
            console.log(responseAsJson);
        }else{
            const errorInfo = await response.text();
            console.log("Fehlermeldung des Servers: ", errorInfo);
        }
    } catch (error) {
        console.error("Fehler beim der API abfrage -> BASE_URL " )
        
        
    }
}

