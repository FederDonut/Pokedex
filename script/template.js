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
                    <h4>Typ:</h4>
                    <div id="main-type${id}">
                      <h4>${typ1}</h4>
                    </div>
                  </div>
                  <div class="typ1">  
                    <h4 id="second-type-header${id}">Typ:</h4>
                    <div id="second-type${id}">
                      <h4>${typ2}</h4>
                    </div>
                  </div>
                </div>
                
              </div>
            </div> 
    `
}

function renderOverlay(){ // Grobstrucktur
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
              <h2>#${PokemonObjects[i].id}</h2>
              <h2>${PokemonData[i].name}</h2>
              <button class="exitBtn" onclick="toggleOverlay(${i})">X</button>
          </div>
          <div class="img-Container" id="overlay-img-container">
              <img src="" class="overlay-img card-Img" id="overlay-img">
          </div>
          <div class="overlay-pokemon-stats">
              <div class="overlay-stats" id="overlay-stats-1">
              
              </div>
              <div class="overlay-stats" id="overlay-test-2">
              
              </div>
          </div>
          <div class="switchBtn">
              <button></button>
              <button></button>
          </div>

      </div>
        
  
  `
}

function htmlOverlayPokemonStats(i){
  return`  
        <h3>height: ${PokemonObjects[i].height/10} m</h3>
        <h3>weight: ${PokemonObjects[i].weight/10} kg</h3>
        <h3>Typ: ${PokemonObjects[i].typ1}</h3>
        <h3>Typ: ${PokemonObjects[i].typ2}</h3>
        <h3>attack: ${PokemonObjects[i].ability1}</h3>
        <h3>attack: ${PokemonObjects[i].ability2}</h3>
  `
}

function htmlOverlaytest(i){
  return`
        <h3>HP: ${PokemonObjects[i].hp}</h3>
        <h3>ATK: ${PokemonObjects[i].atk}</h3>
        <h3>DEF: ${PokemonObjects[i].def}</h3>
        <h3>Special-ATK: ${PokemonObjects[i].s_atk}</h3>
        <h3>Special-DEF: ${PokemonObjects[i].s_dev}</h3>
        <h3>Speed: ${PokemonObjects[i].speed}</h3>  
  `
}