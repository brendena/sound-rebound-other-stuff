resizeTimer = "";
window.onresize = function(event) {
    console.log("resizing")
    //https://css-tricks.com/snippets/jquery/done-resizing-event/
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log("drawing");
        //wavesurfer.empty();
        //wavesurfer.drawBuffer();
        
    }, 250);

};


document.getElementById('audioWaveLabelToggle').addEventListener('click', function(e){
    //e.preventDefault();
    console.log("went through")
    toggleDisplay(document.getElementById('audioWave'),
                  document.getElementById('audioWaveToggle').checked);
})

document.getElementById('frequencyToggle').addEventListener('click', function(){
    toggleDisplay();
})
document.getElementById('spectrogramLabelToggle').addEventListener('click', function(e){
    //e.preventDefault();
    console.log("went through")
    toggleDisplay(document.getElementById('wave-spectrogram'),
                  document.getElementById('spectrogramToggle').checked);
})

var toggleDisplay = function(tag,display){
    if(display==true){
        tag.style.opacity = "1";
    }
    else{
        tag.style.opacity = "0";
    }
}


