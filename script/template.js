// Pokemons werden hier abgebildet.
function htmlLayout(id,name,typ1,typ2){
    return `
           <div class="card" style="" onclick="${id}" id="card${id}">
              <img src="" id="Pokemon-Img${id}"class="card-Img" alt="...">
              <div class="card-body">
                <p class="card-text">Name:${name}</p>
                <p>#</p><p id="id"> ${id}</p>
                
                  <div id="Pokemon-Typ">
                    <div id="main-type${id}">
                      <p>${typ1}</p>
                    </div>
                    <div id="second-type${id}">
                      <p>${typ2}</p>
                    </div>
                  </div>
                
              </div>
            </div> 
    `
}

