// Ausschließlich Pokemon der ersten Generation werden abgefragt 
//let PokeNames =[];
//const BASE_URL ="https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"


const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
let counter = 25;// Gibt an wie viele Pokemon im Pokedex geladen werden 
let loadedPokemonTotal = counter;
let loadedPokemon = 0;



function init(){
    fetchBaseAPI();
    renderMoreContent()
    showLoadingSpinner();
}

async function fetchBaseAPI(startIndex = 1, endIndex = counter){
    //showLoadingSpinner();
    const startIndexOfNewData = rowData.length // Notwendig für die LodingFunktin 
    for(index = startIndex; index <= endIndex; index++ ){
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
    dataProcessing(startIndexOfNewData);   
    processingPokemonTypes(startIndexOfNewData);
    processingPokemonAbilitys(startIndexOfNewData);
    processingPokemonStats(startIndexOfNewData)
    createPokemonObject(startIndexOfNewData);
    fetchPokemonIMG(startIndexOfNewData);
    renderPokemonObject(startIndexOfNewData); 
}

async function fetchPokemonIMG(startIndex =0 ) {
    for(let i =startIndex; i < PokemonObjects.length; i++){
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


function removeMarkingChoosenPokemon(){
    let marker = document.getElementById('card'+counter);
    if(marker){
        marker.classList.remove('choosen-pokemon');
        marker.classList.remove('neon-pulse');
    }
}

function renderPokemonObject(startIndex = 0){
    let contentRef = document.getElementById('content');
    //contentRef.innerHTML="";
    for(i = startIndex; i< PokemonObjects.length; i++){
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
    //showLoadingSpinner();
    let spriete = document.getElementById('Pokemon-Img'+id);// wichtig kein , sondern +
    //spriete.innerHTML="";
    spriete.src = imgResponse.url
    spriete.onload= function(){ // Bild ist vollständig geladen onload()
        loadedPokemon ++
        console.log(`Bild für Pokemon ${id} geladen (${loadedPokemon}/${loadedPokemonTotal})`);
        if(loadedPokemon === loadedPokemonTotal){
            hiedLoadingSpinner();
        }
    }
    spriete.onerror = function(){
        console.error(`Fehler beim Laden des Bildes für Pokemon ${id}`);
        loadedPokemon++; 
        if(loadedPokemon === loadedPokemonTotal){
            hiedLoadingSpinner();
        }
    }; 
    
};
function renderMoreContent(){
    let loadBtn = document.getElementById('more-content');
    loadBtn.innerHTML =  htmlLoadButton();
}

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
        removeMarkingChoosenPokemon();
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

async function findPokemon() {
    let serach = document.getElementById('search')
    let contentRef = document.getElementById('content');
    let input = serach.value;
    checkInputValue(input)
    loadedPokemon = 0;
    try{
        const searchResponse = await fetch(BASE_URL+input);
        if(searchResponse.ok){
            showLoadingSpinner();
            contentRef.innerHTML="";
            let data = await searchResponse.json();
            counter = data.id;
            loadedPokemonTotal = data.id;     
            clearStorage();
            fetchBaseAPI();
            setTimeout(markingChoosenPokemon,2000);
            
        }
    }catch(error){
        console.error(error);
    }  
}
function checkInputValue(input){
    const isNumber = Number(input);
    if(input.length < 3 && !isNumber){
        alert('Mindestens 3 Zeichen oder eine nummerische ID !');
        return; // löst funktions abbruch aus 
    }
}

function clearStorage(){
    rowData=[];
    PokemonData=[];
    PokemonAbilitys=[];
    PokemonStats=[];
    PokemonTypes=[];
    PokemonObjects=[];
}
function markingChoosenPokemon(){
    let marker = document.getElementById('card'+counter);
    console.log(counter);
    //console.log(marker)
    if(marker){
        marker.classList.add('choosen-pokemon');
        marker.classList.add('neon-pulse');
        marker.scrollIntoView();
    }
}

function loadMorePokemon(){
    showLoadingSpinner();
    removeMarkingChoosenPokemon();
    let newStartIndex = counter +1 ;
    counter +=20;
    let newEndIndex = counter
    loadedPokemonTotal = 20;
    loadedPokemon = 0
    //console.log('StartIndex',newStartIndex,
    //    'EndIndex' ,newEndIndex,
    //    'Gibt an wie viele neue Pokemon geladen werden', loadedPokemonTotal,
    //    'Gibt an wie viele Pokemon geladen sind', loadedPokemon
    //); 
    fetchBaseAPI(newStartIndex, newEndIndex);

}

