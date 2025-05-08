// Pokemons werden hier abgebildet.
function htmlLayout(id,name){
    return `
           <div class="card" style="width: 18rem;">
              <img src="" id="Pokemon-Img"class="card-img-top" alt="...">
              <div class="card-body">
                <p class="card-text">Name:${name} Index: ${id}</p>
              </div>
            </div> 
    `
}