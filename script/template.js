// Pokemons werden hier abgebildet.
function htmlLayout(id,name,typ1,typ2){
    return `
           <div class="card" style="" onclick="">
              <img src="" id="Pokemon-Img${id}"class="card-img-top" alt="...">
              <div class="card-body">
                <p class="card-text">Name:${name}</p>
                <p>#</p><p id="id"> ${id}</p>
                <div id="types${id}">
                  <div id="Pokemon-Typ">
                    <div id="typ1">
                      <p>${typ1}</p>
                    </div>
                    <div id="typ2">
                      <p>${typ2}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
    `
}

