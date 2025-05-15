// Ausschließlich Pokemon der ersten Generation werden abgefragt 
//let PokeNames =[];
//const BASE_URL ="https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"


const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
let counter = 15;// Gibt an wie viele Pokemon im Pokedex geladen werden 



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
                
                //console.log(i);       
            }
        } catch (error) {
            console.error(error);
        }
         
    }
    
}

async function fetchOverlayPokemonImg(i){
    let img_link = PokemonData[i].img_url;
    try{
        const overlayResponse = await fetch(img_link);
        if(overlayResponse.ok){
            renderOverlayPokemonImg(overlayResponse);
        }
    }catch(error){
        console.error(error);
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
        let height = PokemonData[i].height/10
        let weight= PokemonData[i].weight/10
        contentRef.innerHTML += htmlLayout(id,name,typ1,typ2,height,weight,i);
        backgroundColor(id);
        checkTypes(id);
            
    }  
};

function renderPokemonImg(imgResponse ,id){// Lädt die Bilder 
    //console.log(imgResponse);
    let spriete = document.getElementById('Pokemon-Img'+id);// wichtig kein , sondern +
    spriete.innerHTML="";
    spriete.src = imgResponse.url 
    
};

function backgroundColor(id){
    let type = document.getElementById('main-type'+id);
    let card = document.getElementById('card'+id);
    //console.table(type.innerText);
    card.classList.add(type.innerText);
};
function checkTypes(id){
    let secondType = document.getElementById('second-type'+id);
    let header = document.getElementById('second-type-header'+id);
    if(secondType.innerText == "undefined"){
        secondType.innerHTML=""
        header.innerHTML=""
    }
}

function toggleOverlay(i){
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.toggle('d_none');
    if(overlayRef.classList.contains('d_none')){
        //console.log(true,'d_none ist aktiv overlay nicht sichtbar ')
        overlayRef.innerHTML="";

    }else{
        //console.log(false,'d_none ist inaktiv overlay sichtbar ')
        overlayRef.innerHTML = renderOverlay();
        renderOverlayTypeColor(i);
        renderPokemonOnOverlayContent(i);
        fetchOverlayPokemonImg(i);
        renderPokemonOverlayStats(i);
        //renderPokemonOnOverlayHeader_appendChild(i);
    }
}

function preventBubbling (event){
    event.stopPropagation();   
}

function renderPokemonOnOverlayContent(i){
    let content = document.getElementById('overlay-body');
    content.innerHTML += htmlOverlayBody(i);
}

function renderOverlayTypeColor(i){
    let card = document.getElementById('overlay-card');
    let pokeTyp = PokemonObjects[i].typ1;
    console.log(pokeTyp)
    card.classList.toggle(pokeTyp);
}

function renderOverlayPokemonImg(overlayResponse){// Lädt die Bilder 
    //console.log(imgResponse);
    let spriete = document.getElementById('overlay-img');// wichtig kein , sondern +
    spriete.innerHTML="";
    spriete.src = overlayResponse.url 
    
};

