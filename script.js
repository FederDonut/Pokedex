
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
let counter = 25; 
let loadedPokemonTotal = counter;
let loadedPokemon = 0;

function init(){
    maxOverlayLimit.addEventListener('change', callResponsivOverlay);
    fetchBaseAPI();
    renderMoreContent()
    showLoadingSpinner()
}

async function fetchBaseAPI(startIndex = 1, endIndex = counter){
    const startIndexOfNewData = rowData.length 
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
    callFetchApiFunctions(startIndexOfNewData)
}

function callFetchApiFunctions(startIndexOfNewData){

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

function backgroundColor(id){
    let type = document.getElementById('main-type'+id);
    let card = document.getElementById('card'+id);
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

function checkTypesOnOverlay(i){
    let divContainer = document.getElementById('flex-content-typ2');
    let secondTypeValue = document.getElementById('overlay-typ'+PokemonObjects[i].id);
    if(secondTypeValue.innerText == "undefined"){
        divContainer.innerHTML=""
    }
}

function toggleOverlay(i){
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.toggle('d_none');
    if(overlayRef.classList.contains('d_none')){
        overlayRef.innerHTML="";
        scrollPrevention();
    }else{
        overlayRef.innerHTML = renderOverlay();
        callOverlay(i); 
    }
}

function callOverlay(i){
    renderOverlayTypeColor(i);
    renderPokemonOnOverlayContent(i);
    fetchOverlayPokemonImg(i);
    renderPokemonOverlayStats(i);
    calculatePokemonStats(i);
    checkTypesOnOverlay(i);
    extractPokemonId(i); 
    currentWindowWidth(i);
    callResponsivOverlay(i);
    scrollPrevention();
    if(window.innerWidth<=575){
        statsButtonManagement();
    }
     
}

function preventBubbling (event){
    event.stopPropagation();   
}

function scrollPrevention(){
    let body =document.body;
    let controler = document.getElementById('overlay');
    if(!controler.classList.contains('d_none')){
        body.classList.add('scroll_prevention');
    }else{
        body.classList.remove('scroll_prevention');
    }
}

function switchBtnLeft(i){
    let BtnLeft = document.getElementById('overlay');
    if(i >0){
        BtnLeft.innerHTML= renderOverlay();
        callSwitchBtn(i-1);
    }else{
        i=counter-1;
        BtnLeft.innerHTML= renderOverlay();
        callSwitchBtn(i);
    }
}

function switchBtnRight(i){
    let BtnRight = document.getElementById('overlay')
    if(i < counter -1){
        BtnRight.innerHTML = renderOverlay();
        callSwitchBtn(i+1);
       
    }else{
        i=0;
        BtnRight.innerHTML = renderOverlay();
        callSwitchBtn(i);
    }
        
}

function callSwitchBtn(i){
    renderOverlayTypeColor(i);
    renderPokemonOnOverlayContent(i);
    fetchOverlayPokemonImg(i);
    renderPokemonOverlayStats(i);
    calculatePokemonStats(i);
    checkTypesOnOverlay(i);
    extractPokemonId(i); 
    currentWindowWidth()
    showNormalStats();
    statsButtonManagement();    
}

function checkInputValue(input){
    const isNumber = Number(input);
    if(input.length < 3 && !isNumber){
        alert('Mindestens 3 Zeichen oder eine nummerische ID !');
        return; 
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
    if(marker){
        marker.classList.add('choosen-pokemon');
        marker.classList.add('neon-pulse');
        marker.scrollIntoView();
    }
}

function loadMorePokemon(){
    showLoadingSpinner();
    let newStartIndex = counter +1 ;
    counter +=20;
    let newEndIndex = counter
    loadedPokemonTotal = 20;
    loadedPokemon = 0
    fetchBaseAPI(newStartIndex, newEndIndex);
}

function findPokemon(){
    let search = document.getElementById('search');
    const target = search.value.toLowerCase();
    if(search.value.length >= 3){
        let matchingPokemonIds = PokemonObjects.filter(pokemon =>{
            console.log(pokemon.name.toLowerCase().startsWith(target))    
            return pokemon.name.toLowerCase().startsWith(target);
        }).map(pokemon => pokemon.id)
        markfoundedPokemon(matchingPokemonIds);
    }else{
        alert('Min drei Zeichen eingeben')
    }
}

function markfoundedPokemon(matchingPokemonIds){
    const contentElements = document.querySelectorAll('#content .card');
    let reloadBtn = document.getElementById('reloadBtn');
    for( m = 0; m < contentElements.length; m++){
        const pokemonElement = contentElements[m];
        const elementIdString = pokemonElement.id.replace('card', ''); 
        const pokemonId = parseInt(elementIdString);
        if(matchingPokemonIds.includes(pokemonId)){
            pokemonElement.classList.add('choosen-pokemon');
        }else{
            pokemonElement.classList.add('d_none');
        }
    }
    reloadBtn.classList.remove('d_none');
}

function reload(){
    location.reload();
}

