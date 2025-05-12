// Pokemons werden hier abgebildet.
function htmlLayout(id,name){
    return `
           <div class="card" style="width: 18rem;">
              <img src="" id="Pokemon-Img${id}"class="card-img-top" alt="...">
              <div class="card-body">
                <p class="card-text">Name:${name} Index: ${id}</p>
              </div>
            </div> 
    `
}

function renderImg(imgResponse ,id){// Lädt die Bilder 
  //console.log(imgResponse);
  let spriete = document.getElementById('Pokemon-Img'+id);// wichtig kein , sondern +
  spriete.innerHTML="";
  spriete.src = imgResponse.url  
}