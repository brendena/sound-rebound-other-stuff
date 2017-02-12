var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
});

 var spectrogram = "";
wavesurfer.on('ready', function () {
    wavesurfer.enableDragSelection({});
    spectrogram = Object.create(WaveSurfer.Spectrogram);

    spectrogram.init({
        wavesurfer: wavesurfer,
        container: "#wave-spectrogram"
    });
    
    var timeline = Object.create(WaveSurfer.Timeline);

    timeline.init({
        wavesurfer: wavesurfer,
        container: '#waveform-timeline'
    });
});

// how to use events
//https://wavesurfer-js.org/docs/events.html


/*only fires when you click object*/ 
wavesurfer.on('region-click', function(region){
    console.log(region.id) 
    console.log(region)
    console.log(map(region.start,0,audioElement.duration, 0,100 ))
    if(wavesurfer.isPlaying()){
        wavesurfer.playPause();
    }
    else{
        region.playLoop();
    }
    toggleAudio()
    
});


//updates like crazy
//fires whenever a region changes
resizeTimerRegion = ""
wavesurfer.on('region-updated',function(region){
    //console.log("updated");
    //console.log(region.id);
    clearTimeout(resizeTimerRegion);
    var thatRegion = region;
    resizeTimerRegion = setTimeout(function(region) {
        //console.log(thatRegion)
        updateCurrentRegion(thatRegion)
        //console.log("updating region");
        changeSlider()
    }, 250) ;


});

var updateCurrentRegion = function(region){
    this.GlobalRegion = region;
    updateSliderPostion();
}

//'https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'
console.log(audioElement.src)
wavesurfer.load(audioElement.src);

document.getElementById('zoomSlider').onchange = function () {
    wavesurfer.zoom(Number(this.value));
};

