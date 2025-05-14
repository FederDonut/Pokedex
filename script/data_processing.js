
let rowData = [];
let PokemonData =[];// Name + BasisURL
let PokemonTypes = [];
let PokemonObjects =[]





function dataProcessing(){//Datenverarbeitung
    //console.log(rowData);
    for(index = 0; index < rowData.length; index++){
        //console.log(rowData[i].name);
        //console.log(rowData[index].id);
        //console.log(rowData[index].sprites.front_default);
        //console.log(rowData[index].types)
        PokemonData.push({
            name: rowData[index].name,
            id: rowData[index].id,
            types: rowData[index].types,
            img_url: rowData[index].sprites.front_default,
            height: rowData[index].height,
            weight: rowData[index].weight
            
        });
    }
    //console.table(PokemonData);
 
}

function processingPokemonTypes(){ // Datenverarbeitung
    for(i =0; i< PokemonData.length;i++){
        const pokemonId = PokemonData[i].id;
        const typesArray = Object.values(PokemonData[i].types).map(typeInfo => typeInfo.type.name)
        //console.log(typesArray)        
            PokemonTypes.push({
                id: pokemonId,
                typ1: typesArray[0],
                typ2: typesArray[1]
            })
    } 
    //renderPokemonTypes();         
    //(console.log(PokemonTypes);
}

function createPokemonObject(){
   
    //console.table(PokemonData)
    //console.table(PokemonTypes)
    for(i = 0; i<PokemonData.length;i++){
        //console.log(PokemonData[i].id)
        //console.log(PokemonTypes[i].id)
        //console.log(PokemonTypes[i].typ1)
        //console.log(PokemonTypes[i].typ2)
        if(PokemonData[i].id == PokemonTypes[i].id){
            let pokemon= {
                name: PokemonData[i].name, 
                id: PokemonData[i].id,
                typ1: PokemonTypes[i].typ1,
                typ2: PokemonTypes[i].typ2,
                img_url: PokemonData[i].img_url,
                weight: PokemonData[i].weight ,// angabe in kg muss noch angepasst werden
                height: PokemonData[i].height //umrechnung in m
            };
            PokemonObjects.push(pokemon);
        }else{
            console.log("Id`s stimmen nicht überein")
        }
        
    }
   //console.table(PokemonObjects);       
}