//Content-Begrenzung für große Monitore (max-width z.B. bei 1920px oder 1440px)
const contentLimit = window.matchMedia('(max-width: 1920px)'); 
const maxOverlayLimit = window.matchMedia('(max-width: 575px)');
const backToNormal = window.matchMedia('(max-width: 578px)');

maxOverlayLimit.addEventListener('change', callResponsivOverlay);
//backToNormal.addEventListener('change',)

//Initale Abfrage
function currentWindowWidth(i){
    let overlayRef = document.getElementById('overlay');
    console.log(window.innerWidth);
    if(window.innerWidth <= 575 && !overlayRef.classList.contains('d_none')){
        prepareForResponsivOverlayStats();
        renderResponsivOverlay(i);
    }else{
        backToNormalOverlay();
    }
}

//Dynamische Änderung
function callResponsivOverlay(){
    if(maxOverlayLimit.matches){
        console.log('body with <= 575px');
        prepareForResponsivOverlayStats();
        
        
    }else{
        backToNormalOverlay();
    }
}

function renderResponsivOverlay(i){
    let stats = document.getElementById('responsiv-stats');
    stats.innerHTML = htmlResponsivOverlay(i);

}

function prepareForResponsivOverlayStats(){
    let stats = document.getElementById('stats-summary');
    stats.classList.add('d_none');
    
}

function backToNormalOverlay(){
    let stats = document.getElementById('stats-summary');
    stats.classList.remove('d_none');
    
}