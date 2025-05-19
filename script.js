// Ausschließlich Pokemon der ersten Generation werden abgefragt 
//let PokeNames =[];
//const BASE_URL ="https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"


const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
let counter = 25;// Gibt an wie viele Pokemon im Pokedex geladen werden 

async function findPokemon() {
    let serach = document.getElementById('search')
    let content = document.getElementById('content')
    let input = serach.value;
    console.log(input);
    try{
        const searchResponse = await fetch(BASE_URL+input);
        if(searchResponse.ok){
            let data = await searchResponse.json();
            console.log(data.id);
            console.log(data.name);
            console.log(counter);
            counter = data.id;
            console.log(counter);
            //content.innerHTML="";
            rowData=[];
            PokemonData=[];
            PokemonAbilitys=[];
            PokemonStats=[];
            PokemonTypes=[];
            PokemonObjects=[];
            PokemonMaxStatsValue=[];
            fetchBaseAPI();
            //console.table(rowData);  
        }
    }catch(error){
        console.error(error);
    }
   

    
    
}

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
    processingPokemonAbilitys();
    processingPokemonStats()
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
        //console.log(false,'d_none ist inaktiv overlay sichtbar')
        overlayRef.innerHTML = renderOverlay();
        renderOverlayTypeColor(i);
        renderPokemonOnOverlayContent(i);
        fetchOverlayPokemonImg(i);
        renderPokemonOverlayStats(i);
        calculatePokemonStats(i);
    }
}

function preventBubbling (event){
    event.stopPropagation();   
}

function switchBtnLeft(i){
    let BtnLeft = document.getElementById('overlay');
    if(i >0){
        BtnLeft.innerHTML= renderOverlay();
        renderOverlayTypeColor(i-1);
        renderPokemonOnOverlayContent(i-1);
        fetchOverlayPokemonImg(i-1);
        renderPokemonOverlayStats(i-1);
        calculatePokemonStats(i-1);
    }else{
        i=counter-1;
        BtnLeft.innerHTML= renderOverlay();
        renderOverlayTypeColor(i);
        renderPokemonOnOverlayContent(i);
        fetchOverlayPokemonImg(i);
        renderPokemonOverlayStats(i);
        calculatePokemonStats(i);
    }
}

function switchBtnRight(i){
    let BtnRight = document.getElementById('overlay')
    if(i < counter -1){
        BtnRight.innerHTML = renderOverlay();
        renderOverlayTypeColor(i+1);
        renderPokemonOnOverlayContent(i+1);
        fetchOverlayPokemonImg(i+1);
        renderPokemonOverlayStats(i+1);
        calculatePokemonStats(i+1);
    }else{
        i=0;
        BtnRight.innerHTML = renderOverlay();
        renderOverlayTypeColor(i);
        renderPokemonOnOverlayContent(i);
        fetchOverlayPokemonImg(i);
        renderPokemonOverlayStats(i);
        calculatePokemonStats(i);
    }
        
}