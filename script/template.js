// Pokemons werden hier abgebildet.
function htmlLayout(i,name){
    return `
           <div class="card" style="width: 18rem;">
              <img src="..." class="card-img-top" alt="...">
              <div class="card-body">
                <p class="card-text">Name:${name} Index: ${i}</p>
              </div>
            </div> 
    `
}