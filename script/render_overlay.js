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

function renderPokemonOverlayStats(i){
    let stats = document.getElementById('overlay-stats-1');
    stats.innerHTML = htmlOverlayPokemonStats(i);
}