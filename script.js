// Ausschließlich Pokemon der ersten Generation werden abgefragt 
//let PokeNames =[];
//const BASE_URL ="https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"


const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
let counter = 12;// Gibt an wie viele Pokemon im Pokedex geladen werden 



function init(){
    fetchBaseAPI();   
}

async function fetchBaseAPI(){
   
    for(index = 1; index <= counter; index++ ){
        try {
            const response = await fetch(BASE_URL+index);
            if(response.ok){
                let data = await response.json();
                rowData.push(data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    dataProcessing();
    //fetchIMG();
    renderPokemon();
       
}

function dataProcessing(){
    //console.log(rowData);
    for(index = 0; index < rowData.length; index++){
        //console.log(rowData[i].name);
        //console.log(rowData[i].id);
        //console.log(rowData[i].sprites.front_default);
        //console.log(rowData[i].types)
        PokemonData.push({
            name: rowData[index].name,
            id: rowData[index].id,
            types: rowData[index].types,
            img_url: rowData[index].sprites.front_default
            
        });
    }
    console.table(PokemonData);
    fetchIMG() // Rufe die Bidverarbeitung nach der Datenspeicherung auf 
}

async function fetchIMG() {
    for(let i =0; i < counter; i++){
        let img_link = PokemonData[i].img_url;
        let id = PokemonData[i].id
        //console.log(img_link);
        //console.log(i)
        try {
            const imgResponse = await fetch(img_link);
            if(imgResponse.ok){
                //const imgData = await imgResponse.json();
                //console.log("ImgFetch funktioniert")
                console.log(img_link);
                console.log(id);
                renderImg(imgResponse, id);        
            }
        } catch (error) {
            console.error(error);
        }
        
    }
}

function renderImg(imgResponse ,id){
    //console.log(imgResponse);
    let spriete = document.getElementById('Pokemon-Img'+id);// wichtig kein , sondern +
    spriete.innerHTML="";
    //for(let i = 0; i< PokemonData.length; i++){
        spriete.src = imgResponse.url
    //}
    
    
}












function renderPokemon(){
    let contentRef = document.getElementById('content');
    let imgRef = document.getElementById('Pokemon-Img');
    //imgRef.innerHTML="";
    contentRef.innerHTML="";
    for(i = 0; i < PokemonData.length; i ++){
        let name = PokemonData[i].name;
        let id = PokemonData[i].id;
        //let img = PokemonData[i].
        //let img = PokemonData[i].sprites.front_default;
        contentRef.innerHTML += htmlLayout(id,name);
        
    }
};
