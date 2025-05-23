
let rowData = [];

let PokemonData =[];// Name + BasisURL
let PokemonAbilitys =[];
let PokemonStats = [];

let PokemonTypes = [];

let PokemonObjects =[]; // Finaler Datensatz

//Quelle ChatGpt
let PokemonMaxStatsValue = [
    {
        hp: 255,
        atk: 200,
        def: 230,
        s_atk: 200,
        s_def: 230,
        speed: 200
    }
]// maximal Werte für Progressbar





function dataProcessing(startIndexProcessing = 0){//Datenverarbeitung
    for(index = startIndexProcessing; index < rowData.length; index++){
        PokemonData.push({
            name: rowData[index].name,
            id: rowData[index].id,
            types: rowData[index].types,
            img_url: rowData[index].sprites.front_default,
            height: rowData[index].height,
            weight: rowData[index].weight,
            ability: rowData[index].abilities,
            stats: rowData[index].stats
            
        });
    }
}

function processingPokemonTypes(startIndexProcessing = 0){ // Datenverarbeitung
    for(i =startIndexProcessing; i< PokemonData.length;i++){
        const pokemonId = PokemonData[i].id;
        const typesArray = Object.values(PokemonData[i].types).map(typeInfo => typeInfo.type.name)        
        PokemonTypes.push({
            id: pokemonId,
            typ1: typesArray[0],
            typ2: typesArray[1]
        })
    } 
}
function processingPokemonAbilitys(startIndexProcessing = 0){
    for(i = startIndexProcessing; i< PokemonData.length;i++){
        const pokemonId = PokemonData[i].id;
        const abilityArray = Object.values(PokemonData[i].ability).map(abilityName => abilityName.ability.name)
        PokemonAbilitys.push({
            id: pokemonId,
            attack1: abilityArray[0],
            attack2: abilityArray[1]
        })
    }
}

function processingPokemonStats(startIndexProcessing = 0){
    for(i = startIndexProcessing; i<PokemonData.length; i++){
        const pokemonId = PokemonData[i].id;
        const statsArrayValue = Object.values(PokemonData[i].stats).map(statsValue => statsValue.base_stat)
        PokemonStats.push({
            id: pokemonId,
            hp: statsArrayValue[0],
            atk: statsArrayValue[1],
            def: statsArrayValue[2],
            s_atk: statsArrayValue[3],
            s_def: statsArrayValue[4],
            speed: statsArrayValue[5] 
        })
    }  
}

function createPokemonObject(startIndexProcessing = 0){
    for(i = startIndexProcessing; i<PokemonData.length;i++){
        // !! --> Primärschlüssel: PokemonData[i].id <-- !!
        if(PokemonData[i].id == PokemonTypes[i].id && PokemonData[i].id == PokemonAbilitys[i].id
            && PokemonData[i].id == PokemonStats[i].id){
            let pokemon= {
                name: PokemonData[i].name, 
                id: PokemonData[i].id,
                typ1: PokemonTypes[i].typ1,
                typ2: PokemonTypes[i].typ2,
                img_url: PokemonData[i].img_url,
                weight: PokemonData[i].weight ,
                height: PokemonData[i].height, 
                ability1: PokemonAbilitys[i].attack1,
                ability2: PokemonAbilitys[i].attack2,
                hp: PokemonStats[i].hp,
                atk: PokemonStats[i].atk,
                def: PokemonStats[i].def,
                s_atk: PokemonStats[i].s_atk,
                s_def: PokemonStats[i].s_def,
                speed: PokemonStats[i].speed
            };
            PokemonObjects.push(pokemon);
        }else{
            console.log("Id`s stimmen nicht überein")
        }   
    }       
}

function calculatePokemonStats(i){
    let hp = Math.ceil((PokemonObjects[i].hp*100) / PokemonMaxStatsValue[0].hp);
    let atk =Math.ceil((PokemonObjects[i].atk*100) /PokemonMaxStatsValue[0].atk);
    let def = Math.ceil((PokemonObjects[i].def*100) /PokemonMaxStatsValue[0].def)
    let s_atk = Math.ceil((PokemonObjects[i].s_atk*100) /PokemonMaxStatsValue[0].s_atk)
    let s_def = Math.ceil((PokemonObjects[i].s_def*100) /PokemonMaxStatsValue[0].s_def)
    let speed = Math.ceil((PokemonObjects[i].speed*100) /PokemonMaxStatsValue[0].speed)
    renderPokemonOverlaySpecificStats(i,hp,atk,def,s_atk,s_def,speed);
}