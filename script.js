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
    fetchIMG();
    renderPokemon();
    processingPokemonTypes();
    
       
}

function dataProcessing(){
    //console.log(rowData);
    for(index = 0; index < rowData.length; index++){
        //console.log(rowData[i].name);
        //console.log(rowData[i].id);
        //console.log(rowData[index].sprites.front_default);
        //console.log(rowData[index].types)
        PokemonData.push({
            name: rowData[index].name,
            id: rowData[index].id,
            types: rowData[index].types,
            img_url: rowData[index].sprites.front_default
            
        });
        
    }
    //console.table(PokemonData);
 
}

async function fetchIMG() {
    for(let i =0; i < counter; i++){
        let img_link = PokemonData[i].img_url;
        let id = PokemonData[i].id
        try {
            const imgResponse = await fetch(img_link);
            if(imgResponse.ok){
                renderImg(imgResponse, id);
                        
            }
        } catch (error) {
            console.error(error);
        }
         
    }
    
}



function processingPokemonTypes(){
    for(i =0; i< PokemonData.length;i++){
        const pokemonId = PokemonData[i].id;
        const typesArray = Object.values(PokemonData[i].types).map(typeInfo => typeInfo.type.name)
        console.log(typesArray)        
            PokemonTypes.push({
                id: pokemonId,
                typ1: typesArray[0],
                typ2: typesArray[1]
            })
    } 
    //renderPokemonTypes();         
    console.log(PokemonTypes);
}

function renderPokemon(){
    let contentRef = document.getElementById('content');
    contentRef.innerHTML="";
    for(i = 0; i < PokemonData.length; i ++){
        let name = PokemonData[i].name;
        let id = PokemonData[i].id;
        
        contentRef.innerHTML += htmlLayout(id,name);
    }
};



function renderImg(imgResponse ,id){// Lädt die Bilder 
    //console.log(imgResponse);
    let spriete = document.getElementById('Pokemon-Img'+id);// wichtig kein , sondern +
    spriete.innerHTML="";
    spriete.src = imgResponse.url 
    //renderPokemonTypes(id)
};

function renderPokemonTypes(){
   
    
        
    
    //console.log(Number(test.innerText));
    //let types = document.getElementById('types'+id);
    //console.log(PokemonTypes)
    //for(i=0; i<PokemonTypes.length;i++){
    //    
    //    if(PokemonData[i].id == PokemonTypes[i].id){
    //        for(t = 0; t<PokemonTypes[i].types.length ;t++){
    //            //console.log(PokemonData[i].id)
    //            //console.log(PokemonTypes[i].id)
    //            //console.log(true);
    //            let typ01= PokemonTypes[i].types
    //            console.log(typ01);
    //            //console.log(PokemonTypes[i].types[t])
    //            //types.innerHTML += htmlTypsLayout(i,t)
    //            
    //        }
    //        //types.innerText=PokemonTypes[i].types;
    //    }else{
    //        console.log(PokemonData[i].id)
    //        console.log(PokemonTypes[i].id)
    //        console.log(false);
    //    }
    //    
    //}
    
   
    //console.table(PokemonTypes)
    //console.table(PokemonData)
    
    
    
    
    
}
