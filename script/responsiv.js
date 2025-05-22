//Content-Begrenzung für große Monitore (max-width z.B. bei 1920px oder 1440px)
const contentLimit = window.matchMedia('(max-width: 1920px)'); 
const maxOverlayLimit = window.matchMedia('(max-width: 580px)');
const backToNormal = window.matchMedia('(max-width: 578px)');


//backToNormal.addEventListener('change',)

//Initale Abfrage
function currentWindowWidth(i){
    let overlayRef = document.getElementById('overlay');
    //console.log(window.innerWidth,'initale abfrage');
    if(window.innerWidth <= 575 && !overlayRef.classList.contains('d_none')){
       //console.log(true);
        prepareForResponsivOverlayStats();
        renderResponsivOverlay(i);
    }//else{
        //console.log(false);
        //backToNormalOverlay();
    //}
}

//Dynamische Änderung
function callResponsivOverlay(){
    let overlayRef = document.getElementById('overlay');
    if(overlayRef && !overlayRef.classList.contains('d_none')){
        //console.log('overlay ist sichtbar')
        maxOverlayLimit.addEventListener('change', callResponsivOverlay);
        if(maxOverlayLimit.matches && !overlayRef.classList.contains('d_none')){
            //console.log('body with <= 575px --> dynamisch');
            //console.log('Backto... sollte nun deaktiv sein')
            prepareForResponsivOverlayStats();
            renderResponsivOverlay(i);    
        }else{
            //console.log('backtoNormal sollte jetzt greifen ');
            backToNormalOverlay();
        }
    }else{
        console.log('overlay nicht sichtbar');
    } 
}

function renderResponsivOverlay(i){
    let stats = document.getElementById('responsiv-stats');
    if(stats.classList.contains('d_none')){
        //console.log('buttons sollten wieder erscheinen');
        stats.classList.remove('d_none');
    }
    //let anchor = document.getElementById('groundingPoint');
    //console.log(anchor.innerText);
    stats.innerHTML = htmlResponsivOverlay(i);

}

function prepareForResponsivOverlayStats(){
    let stats = document.getElementById('stats-summary');
    stats.classList.add('d_none');    
}

function backToNormalOverlay(){
    //let control = document.getElementById('overlay-pokemon-stats'); 
    let control = document.getElementById('stats-summary');
    let responsivBtn = document.getElementById('responsiv-stats')
    control.classList.remove('d_none');
    if(control && !control.classList.contains('d_none')){
        responsivBtn.classList.add('d_none');
    }
}
//
//function showCombatStats(i){
//    console.log(i)
//    console.log('combat');
//    //calculatePokemonStats(i);
//    //let statsLoader = document.getElementById('stats-loader');
//    
//}
//function showNormalStats(i){
//    console.log(i)
//    console.log('normal');
//    //let statsLoader = document.getElementById('stats-loader');
//    //statsLoader.innerHTML = htmlOverlayPokemonStats(i);
//}