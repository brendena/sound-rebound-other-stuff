var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
});

wavesurfer.load('https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');

console.log(wavesurfer)



document.getElementById('audioWaveLabelToggle').addEventListener('click', function(){
    console.log("went through")
    toggleDisplay(document.getElementById('audioWave'),
                  document.getElementById('audioWaveToggle').checked);
})

document.getElementById('frequencyToggle').addEventListener('click', function(){
    toggleDisplay();
})
document.getElementById('spectrogramToggle').addEventListener('click', function(){
    
})

var toggleDisplay = function(tag,display){
    if(display==true){
        tag.style.display = "none";
    }
    else{
        tag.style.display = "inherit";
    }
}
