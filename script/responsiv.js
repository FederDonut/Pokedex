//Content-Begrenzung für große Monitore (max-width z.B. bei 1920px oder 1440px)
const contentLimit = window.matchMedia('(max-width: 1920px)'); 
const maxOverlayLimit = window.matchMedia('(max-width: 580px)');
const backToNormal = window.matchMedia('(max-width: 578px)');

let responsivIndex;

function extractPokemonId(i){
    responsivIndex = i;
}

// durch den eventlistenr muss "i" global deklariert werden


//Initale Abfrage
function currentWindowWidth(){
    let overlayRef = document.getElementById('overlay');
    if(window.innerWidth <= 575 && !overlayRef.classList.contains('d_none')){
        prepareForResponsivOverlayStats();
        renderResponsivOverlay();
    }
}

//Dynamische Änderung
function callResponsivOverlay(){
    let overlayRef = document.getElementById('overlay');
    if(overlayRef && !overlayRef.classList.contains('d_none')){
        //console.log('overlay ist sichtbar')
        if(maxOverlayLimit.matches && !overlayRef.classList.contains('d_none')){
            //console.log('body with <= 575px --> dynamisch');
            //console.log('Backto... sollte nun deaktiv sein')
            prepareForResponsivOverlayStats();
            renderResponsivOverlay();    
        }else{
            //console.log('backtoNormal sollte jetzt greifen ');
            backToNormalOverlay();
        }
    }else{
        console.log('overlay nicht sichtbar');
    } 
}

function renderResponsivOverlay(){
    
    let stats = document.getElementById('responsiv-stats');
    if(stats.classList.contains('d_none')){
        //console.log('buttons sollten wieder erscheinen');
        stats.classList.remove('d_none');
    }
    
    stats.innerHTML = htmlResponsivOverlay(responsivIndex);

}

function prepareForResponsivOverlayStats(){
    let stats = document.getElementById('stats-summary');
    stats.classList.add('d_none');    
}

function backToNormalOverlay(){
    let control = document.getElementById('stats-summary');
    let responsivBtn = document.getElementById('responsiv-stats')
    control.classList.remove('d_none');
    if(control && !control.classList.contains('d_none')){
        responsivBtn.classList.add('d_none');
    }
}

function showCombatStats(){
    console.log('combat');
    console.log(responsivIndex)
    let statsLoader = document.getElementById('stats-loader');
    statsLoader.innerHTML="";
    copySpecificStats();
    //calculatePokemonStats(responsivIndex);
    //;
    
}
function showNormalStats(){
    //console.log(responsivIndex)
    //console.log('normal');
    let statsLoader = document.getElementById('stats-loader');
    statsLoader.innerHTML="";
    statsLoader.innerHTML = htmlOverlayPokemonStats(responsivIndex);
}

function copySpecificStats(){
    let sourceDiv = document.getElementById('overlay-stats-2');
    let targetDiv = document.getElementById('stats-loader');
    if(sourceDiv && targetDiv){
        const copyContent = sourceDiv.innerHTML;
        targetDiv.innerHTML = copyContent;
    }else{
        console.log('Einer oder Beide Div Container konnten nicht gefunden werden')
    }
}