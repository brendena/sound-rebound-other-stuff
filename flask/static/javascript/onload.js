window.onload = function(){
    changeSlider();
    
    toggleDisplay(document.getElementById('audioWave'),
                  document.getElementById('audioWaveToggle').checked);
    toggleDisplay(document.getElementById('wave-spectrogram'),
                  document.getElementById('spectrogramToggle').checked);
    wavesurfer.zoom(Number(document.getElementById('zoomSlider').value));



};
