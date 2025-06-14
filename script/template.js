// Pokemons werden hier abgebildet.
function htmlLayout(id,name,typ1,typ2,height,weight,i){
    return `
           <div class="card" style="" onclick="toggleOverlay(${i})" id="card${id}">
              <img src="" id="Pokemon-Img${id}"class="card-Img" alt="...">
              <div class="card-body">
                <div class="upper-body">
                  <h5 id="id">#${id}</h5>
                  <h3 class="poke-name">${name}</h3>
                </div>
                <div class="seperator"></div>
                <div class="pokemon-stats">
                  <h4>height: ${height} m</h4>
                  <h4>weight: ${weight} kg</h4>
                </div>
                <div id="Pokemon-Typ" class="pokemon-typ">
                  <div class="typ1">
                    <h4>typ:</h4>
                    <div id="main-type${id}">
                      <h4>${typ1}</h4>
                    </div>
                  </div>
                  <div class="typ1">  
                    <h4 id="second-type-header${id}">typ:</h4>
                    <div id="second-type${id}">
                      <h4>${typ2}</h4>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
    `
}

function renderOverlay(){
  return `
      <div class="overlay-content-flex">
          <div class="overlay-content-render" id="overlay-card" onclick="preventBubbling(event)">
              <div class="overlay-body" id="overlay-body">
               
              </div>
          </div>    
      </div>
  `
}



function htmlOverlayBody(i){
  return `
      <div class="overlay-body-flex">
          <div class="content-header">
              <h2 id="groundingPoint">#${PokemonObjects[i].id}</h2>
              <h2>${PokemonData[i].name}</h2>
              <button class="exitBtn" id="exitBtn" onclick="toggleOverlay(${i})">X</button>
          </div>
          <div class="img-Container" id="overlay-img-container">
              <img src="" class="overlay-img card-Img" id="overlay-img">
          </div>
          <div class="responsiv-pokemon-stats" id="responsiv-stats"></div>
          <div class="overlay-pokemon-stats" id="stats-summary">
              <div class="overlay-stats" id="overlay-stats-1">
              
              </div>
              <div class="overlay-stats" id="overlay-stats-2">
              
              </div>
          </div>
          <div class="switchBtnContainer">
              <button class="switchBtn" id="switchBtnLeft" onclick="switchBtnLeft(${i})"><</button>
              <button class="switchBtn" id="switchBtnRight" onclick="switchBtnRight(${i})">></button>
          </div>

      </div> 
  `
}

function htmlOverlayPokemonStats(i){
  return`
        <div class="flex-content">
            <span><h3 class="height-space-name">height: </h3></span>
            <span><h3 class="height-space-value">${PokemonObjects[i].height/10} m</h3></span>
        </div>
        <div class="flex-content">
            <h3 class="height-space-name">weight: </h3>
            <h3 class="height-space-value">${PokemonObjects[i].weight/10} kg</h3>
        </div>
        <div class="flex-content">
            <h3 class="height-space-name">typ: </h3>
            <h3 class="height-space-value"> ${PokemonObjects[i].typ1}</h3>
        </div>
        <div class="flex-content" id="flex-content-typ2">
            <h3 class="height-space-name" id="overlay-type-header">typ: </h3>
            <h3 class="height-space-value" id="overlay-typ${PokemonObjects[i].id}"> ${PokemonObjects[i].typ2}</h3>
        </div>
        <div class="flex-content">
            <h3 class="height-space-name">attack: </h3>
            <h3 class="height-space-value"> ${PokemonObjects[i].ability1}</h3>
        </div>
        <div class="flex-content">
            <h3 class="height-space-name">attack: </h3>
            <h3 class="height-space-value"> ${PokemonObjects[i].ability2}</h3>
        </div>
  `
}

function htmlOverlayPokemonSpecificStats(i,hp,atk,def,s_atk,s_def,speed){
  return`
        <div class="specific-stats">
            <div class="specific-stats-name"><h3>HP: ${PokemonObjects[i].hp}</h3></div>
            <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar text-bg-success" style="width: ${hp}%"></div>
            </div>
        </div>
        <div class="specific-stats">
           <h3>ATK: ${PokemonObjects[i].atk}</h3>
           <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
               <div class="progress-bar bg-danger" style="width: ${atk}%"></div>
           </div>
        </div>
        <div class="specific-stats">
          <h3>DEF: ${PokemonObjects[i].def}</h3>
          <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar bg-secondary" style="width: ${def}%"></div>
          </div>
        </div>
        <div class="specific-stats">
          <h3>Special-ATK: ${PokemonObjects[i].s_atk}</h3>
          <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning s-atk" style="width: ${s_atk}%"></div>
          </div>
        </div>
        <div class="specific-stats">
          <h3>Special-DEF: ${PokemonObjects[i].s_def}</h3>
          <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning s-def" style="width: ${s_def}%"></div>
          </div>
        </div>
        <div class="specific-stats">
          <h3>Speed: ${PokemonObjects[i].speed}</h3> 
          <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar bg-dark" style="width: ${speed}%"></div>
          </div>
        </div> 
  `
}

function htmlLoadButton(){
  return`
        
        <button class="loadBtn" onclick="loadMorePokemon()">load more Pokemon</button>
  `
}

function htmlLoadingSpinner(){
  return`
        <div class="loader-flex">
            <span class="loader"></span>
        </div>

  `
}

//-------------------------Responsiv Template--------------------------

function htmlResponsivOverlay(responsivIndex){
  return`
        <div class="responsiv-body-flex">
          <div class="responsiv-normal-stats" id="responsiv-normal-stats">
            <button class="loadBtn" id="normalStats" onclick="showNormalStats(${responsivIndex})">Normal Stats</button>
            <button class="loadBtn" id="combatStats" onclick="showCombatStats(${responsivIndex})">Combat Stats</button>
          </div>
          <div class="responsiv-stats-container" id="responsiv-stats-flex" >
            <div class="responsiv-flex-container-normal" id="stats-loader-normal"></div>
            <div class="responsiv-flex-container-combat" id="stats-loader-combat"></div>
          </div>
        </div>

  `
}

