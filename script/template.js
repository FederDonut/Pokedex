// Pokemons werden hier abgebildet.
function htmlLayout(id,name,typ1,typ2,height,weight){
    return `
           <div class="card" style="" onclick="toggleOverlay()" id="card${id}">
              <img src="" id="Pokemon-Img${id}"class="card-Img" alt="...">
              <div class="card-body">
                <div class="upper-body">
                  <h5 id="id">#${id}</h5>
                  <h3 class="poke-name">${name}</h3>
                </div>
                <div class="seperator"></div>
                <div class="pokemon-stats">
                  <h4>Größe: ${height} m</h4>
                  <h4>Gewicht: ${weight} kg</h4>
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

function renderOverlay(){
  return `
      <div class="overlay-content-flex">
          <div class="overlay-content-render">
              
          </div>
      </div>
  `
}
