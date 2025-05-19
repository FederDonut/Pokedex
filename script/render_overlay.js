// Neuer Template Ansatz wird hier verfolgt bzw. angewendet
// !!! id-1 da index bei 0 und nicht bei 1 beginnt !!!




function renderPokemonOnOverlayHeader_appendChild(i){// Neuer Template Ansatz
    let cardHeader = document.getElementById('overlay-body');
    
    if(cardHeader){
        let headline1 = document.createElement('h2');
        let headline2 = document.createElement('h2');
        let exitBtn = document.createElement('button');
        headline1.textContent = PokemonObjects[i].name
        headline2.textContent ='#'+PokemonObjects[i].id 
        exitBtn.textContent = 'X';
        cardHeader.appendChild(headline1);
        cardHeader.appendChild(headline2);
        cardHeader.appendChild(exitBtn);
       
    }
    //renderOverlayCardColor(id)
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


function renderPokemonOverlayStats(i){
    let stats = document.getElementById('overlay-stats-1');
    stats.innerHTML = htmlOverlayPokemonStats(i);
    //checkOverlayTyps(i); // selbes Problem wie zuletzt mit der toggle function 
}

function renderPokemonOverlaySpecificStats(i,hp,atk,def,s_atk,s_def,speed ){// muss getestet werden 
    let stats = document.getElementById('overlay-stats-2');
    stats.innerHTML += htmlOverlayPokemonSpecificStats(i,hp,atk,def,s_atk,s_def,speed);
    // wird aktuell nicht gerendert 
}