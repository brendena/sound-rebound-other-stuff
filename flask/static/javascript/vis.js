var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
});


wavesurfer.on('ready', function () {
    wavesurfer.enableDragSelection({});
    var spectrogram = Object.create(WaveSurfer.Spectrogram);

    spectrogram.init({
        wavesurfer: wavesurfer,
        container: "#wave-spectrogram"
    });

      wavesurfer.addRegion({
        start: 8,
        end: 14,
        color: 'hsla(200, 100%, 30%, 0.1)'
    });
    
    wavesurfer.addRegion({
        start: 28,
        end: 36,
        color: 'hsla(400, 100%, 30%, 0.1)'
    });
    
    var timeline = Object.create(WaveSurfer.Timeline);

    timeline.init({
        wavesurfer: wavesurfer,
        container: '#waveform-timeline'
    });
});

//wavesurfer.params.height = (waveformFrame.offsetHeight - 30); //30px is the time code height, may different in your environment
//wavesurfer.drawer.setHeight((waveformFrame.offsetHeight - 30));
//wavesurfer.drawBuffer();

wavesurfer.load('https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');

console.log(wavesurfer)

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
