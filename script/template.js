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
        <div class="content-header">
          <h2>#${PokemonObjects[i].id}</h2>
          <h2>${PokemonData[i].name}</h2>
        </div>
  
  `
}
