// Ausschließlich Pokemon der ersten Generation werden abgefragt 
//let PokeNames =[];
//const BASE_URL ="https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"


const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
let counter = 12;// Gibt an wie viele Pokemon im Pokedex geladen werden 



function init(){
    fetchBaseAPI();   
}

async function fetchBaseAPI(){
   
    for(index = 1; index <= counter; index++ ){
        try {
            const response = await fetch(BASE_URL+index);
            if(response.ok){
                let data = await response.json();
                rowData.push(data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    dataProcessing();
    renderPokemon();   
}

function dataProcessing(){
    //console.log(rowData);
    for(i = 0; i < rowData.length; i++){
        //console.log(rowData[i].name);
        //console.log(rowData[i].id);
        //console.log(rowData[i].sprites.front_default);
        //console.log(rowData[i].types)
        PokemonData.push({
            name: rowData[i].name,
            id: rowData[i].id,
            types: rowData[i].types,
            img_url: rowData[i].sprites.front_default
            
        });
    }
    console.table(PokemonData);
}


function getImportantData(data){
    PokemonData.push({       
        name: data.name,  
        img_url: data.sprites.front_default,
        id: data.id
    });
   console.log(PokemonData);
}

async function fetchIMG() {
    for(i =0; i < PokemonData.length; i++){
        try {
            const imgResponse = await fetch(PokemonData[i].sprites.front_default);
            if(imgResponse.ok){
                const imgData = await imgResponse.json();
                const imgSprite = PokemonData[i].sprites.front_default;
                
            }
        } catch (error) {
            console.error(error);
        }
    }
}

// To do bilder laden womöglich kann dies innerhalb der ersten fetch Funktion erledigt werden 



//async function fetchBaseAPI(){// eigentliche init()
//    try {
//        let response = await fetch(BASE_URL);
//        if(response.ok){
//            let responseAsJson = await response.json();
//            console.log("API Zugriff erfolgreich");
//            //console.log(responseAsJson);
//            let pokeObjekt = responseAsJson.results;
//            //console.log(pokeObjekt);
//            
//            
//           
//            //getPokemonImg();
//            addPokemonToArray(pokeObjekt);
//            renderPokemon()
//            fetchPokemonDetails();
//            
//        }   
//    } catch (error) {
//        console.error(error);
//    }
//}
//
//// Namen und weiterführende URLs in Array speichern
//function addPokemonToArray(pokeObjekt){
//    let pokeName = Object.keys(pokeObjekt);
//    for(index = 0; index < pokeName.length; index ++){
//        PokeNames.push(
//            {  
//                name : pokeObjekt[index].name,
//                url : pokeObjekt[index].url,
//            }
//        )   
//    }
//}
//
//
//
//async function fetchPokemonDetails(){
//    for(i = 0; i < PokeNames.length ; i++){
//        //console.table(PokeNames[i].url); // URLs separiert
//        try{
//            const details= await fetch(PokeNames[i].url);// Ziehe hier alle einzelnen URLs
//            if(details.ok){
//                let data = await details.json();
//                //console.log(PokeNames[i].name);
//                console.log(data);
//                console.log(data.sprites.front_default);
//                //console.table(PokeNames);
//                //pokemonDetails.push(data);// speichere diese in einem Array
//                 
//            }
//        }catch(error){
//            console.error(error);
//        }
//    }
//    //getPokemonImgURL();
//    return data; // kann die nun in renderfunctins nutzen   
//}
//
//
//
//
//
//
//
//
//
//
//
//









function renderPokemon(){
    let contentRef = document.getElementById('content');
    let imgRef = document.getElementById('Pokemon-Img');
    //imgRef.innerHTML="";
    contentRef.innerHTML="";
    for(i = 0; i < PokemonData.length; i ++){
        let name = PokemonData[i].name;
        let id = PokemonData[i].id;
        //let img = PokemonData[i].sprites.front_default;
        contentRef.innerHTML += htmlLayout(id,name);
        
    }
};
