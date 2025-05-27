function renderPokemonObject(startIndex = 0){
    let contentRef = document.getElementById('content');
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

function renderPokemonOnOverlayContent(i){
    let content = document.getElementById('overlay-body');
    content.innerHTML += htmlOverlayBody(i);
}

function renderOverlayTypeColor(i){
    let card = document.getElementById('overlay-card');
    let pokeTyp = PokemonObjects[i].typ1;
    card.classList.toggle(pokeTyp);
}

function renderOverlayPokemonImg(overlayResponse){
    let spriete = document.getElementById('overlay-img');
    spriete.innerHTML="";
    spriete.src = overlayResponse.url 
};

function renderPokemonOverlayStats(i){
    let stats = document.getElementById('overlay-stats-1');
    stats.innerHTML = htmlOverlayPokemonStats(i);
}

function renderPokemonOverlaySpecificStats(i,hp,atk,def,s_atk,s_def,speed ){ 
    let stats = document.getElementById('overlay-stats-2');
    stats.innerHTML = htmlOverlayPokemonSpecificStats(i,hp,atk,def,s_atk,s_def,speed)
}

function renderPokemonImg(imgResponse ,id){
    let spriete = document.getElementById('Pokemon-Img'+id);
    spriete.src = imgResponse.url
    spriete.onload= function(){
        loadedPokemon ++
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

function renderSearchInfo(){
    let info = document.getElementById('searchInfo');
    info.innerHTML = htmlSearchInfo();
}
//-------------------------------LoadingScreen---------------------
function showLoadingSpinner(){
    let loadinsgspinner = document.getElementById('loading-spinner');
    loadinsgspinner.innerHTML = htmlLoadingSpinner();
    loadinsgspinner.classList.remove('d_none');
}

function hiedLoadingSpinner(){
    let loadinsgspinner = document.getElementById('loading-spinner');
    loadinsgspinner.classList.add('d_none');
}


