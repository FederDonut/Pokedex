// Ausschließlich Pokemon der ersten Generation werden abgefragt 
//let PokeNames =[];
//const BASE_URL ="https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"


const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
let counter = 150;// Gibt an wie viele Pokemon im Pokedex geladen werden 



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
    
   
    processingPokemonTypes();
    createPokemonObject();
    fetchPokemonIMG();
    renderPokemonObject();
    
       
}




async function fetchPokemonIMG() {
    for(let i =0; i < counter; i++){
        let img_link = PokemonObjects[i].img_url;
        let id = PokemonObjects[i].id
        try {
            const imgResponse = await fetch(img_link);
            if(imgResponse.ok){
                renderPokemonImg(imgResponse, id);
                        
            }
        } catch (error) {
            console.error(error);
        }
         
    }
    
}

function renderPokemonObject(){
    let contentRef = document.getElementById('content');
    contentRef.innerHTML="";
    for(i = 0; i< PokemonObjects.length; i++){
        let name = PokemonObjects[i].name;
        let id = PokemonObjects[i].id;
        let typ1 = PokemonObjects[i].typ1
        let typ2 = PokemonObjects[i].typ2
        contentRef.innerHTML += htmlLayout(id,name,typ1,typ2);
    }    
};

function renderPokemonImg(imgResponse ,id){// Lädt die Bilder 
    //console.log(imgResponse);
    let spriete = document.getElementById('Pokemon-Img'+id);// wichtig kein , sondern +
    spriete.innerHTML="";
    spriete.src = imgResponse.url 
    
};

function backgroundColor(){
    let type = document.getElementById('typ1');

}

