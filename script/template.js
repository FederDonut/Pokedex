// Pokemons werden hier abgebildet.
function htmlLayout(id,name){
    return `
           <div class="card" style="width: 18rem;">
              <img src="" id="Pokemon-Img${id}"class="card-img-top" alt="...">
              <div class="card-body">
                <p class="card-text">Name:${name}</p>
                <p>#</p><p id="id"> ${id}</p>
                <p id="types${id}"></p>
              </div>
            </div> 
    `
}

