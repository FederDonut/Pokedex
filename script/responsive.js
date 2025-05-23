const contentLimit = window.matchMedia('(max-width: 1920px)'); 
const maxOverlayLimit = window.matchMedia('(max-width: 580px)');
const backToNormal = window.matchMedia('(max-width: 578px)');

let responsivIndex;

function extractPokemonId(i){
    responsivIndex = i;
}

function currentWindowWidth(){
    let overlayRef = document.getElementById('overlay');
    if(window.innerWidth <= 575 && !overlayRef.classList.contains('d_none')){
        prepareForResponsivOverlayStats();
        renderResponsivOverlay();
    }
}

function callResponsivOverlay(){
    let overlayRef = document.getElementById('overlay');
    if(overlayRef && !overlayRef.classList.contains('d_none')){
        if(maxOverlayLimit.matches && !overlayRef.classList.contains('d_none')){
            prepareForResponsivOverlayStats();
            renderResponsivOverlay();    
        }else{
            backToNormalOverlay();
        }
    }else{
        console.log('overlay nicht sichtbar');
    } 
}

function renderResponsivOverlay(){
    
    let stats = document.getElementById('responsiv-stats');
    if(stats.classList.contains('d_none')){
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
    let statsLoadernormal = document.getElementById('stats-loader-normal');
    statsLoadernormal.innerHTML="";
    copySpecificStats();
    
}

function showNormalStats(){
    let statsLoaderCombat = document.getElementById('stats-loader-combat');
    statsLoaderCombat.innerHTML="";
    copyNormalStats();
}

function copySpecificStats(){
    let sourceDiv = document.getElementById('overlay-stats-2');
    let targetDiv = document.getElementById('stats-loader-combat');
    if(sourceDiv && targetDiv){
        const copyContent = sourceDiv.innerHTML;
        targetDiv.innerHTML = copyContent;
    }else{
        console.error('Einer oder Beide Div Container konnten nicht gefunden werden')
    }
}

function copyNormalStats(){
    let sourceDiv = document.getElementById('overlay-stats-1');
    let targetDiv = document.getElementById('stats-loader-normal');
    if(sourceDiv && targetDiv){
        const copyNormalContent = sourceDiv.innerHTML;
        targetDiv.innerHTML = copyNormalContent;
    }else{
        console.error('Einer oder Beide Div Container konnten nicht gefunden werden')
    }
}