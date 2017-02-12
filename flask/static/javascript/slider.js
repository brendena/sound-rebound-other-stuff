sliderStart.onchange = function(value){
    changeSlider();
}


sliderEnd.onchange = function(value){
    changeSlider();
}
var updateSliderPostion = function(){

    sliderStart.value = mapToSlider(this.GlobalRegion.start)
    sliderEnd.value = mapToSlider(this.GlobalRegion.end)
      
    changeSlider();
}

var updatingRegionPosition = function(){
    this.GlobalRegion.start = 0;
    //WaveSurfer.Region.updateRender().bind(WaveSurfer)
    chnageSlider();
}

var changeSlider = function(){
    var gradientStyle = generateColorString();
    colorBar.style = gradientStyle;
}

var generateColorString = function(){
    var myArray = [];
    if(typeof  wavesurfer.regions != "undefined"){
        for (var key in wavesurfer.regions.list) {
            if (wavesurfer.regions.list.hasOwnProperty(key)) {
                myArray.push(wavesurfer.regions.list[key]);
            }
        };
    }
    /*
    [
        {"start": 55,
            "end": 70},
        {"start": 33,
            "end": 45},
        
    ];
    */
    console.log(myArray)
    var colorA = "#D3D3D3";
    var colorB = "#ff595c";
    var colorC = "DDAACC";


    returnString = "background: linear-gradient(to right," +
                                          colorA + " 0%,";
    
    for(var i = 0; i < myArray.length; i++){
        var smallestTmp = myArray[i];
        for(var j = i+1; j < myArray.length; j++){
            if(myArray[j].start < smallestTmp.start){
                //print("swapping")
                //print(myArray[i])
                //print(myArray[j])
                smallestTmp = myArray[j];
                myArray[j] = myArray[i]
                myArray[i] = smallestTmp;
            }
        }
    }   
    for(var i =0; i < myArray.length; i++){
        returnString += colorA + " " + mapToHundred(myArray[i].start) + "%," + //
                        colorB + " " + mapToHundred(myArray[i].start) + "%," +
                        colorB + " " + mapToHundred(myArray[i].end) + "%," +
                        colorA + " " + mapToHundred(myArray[i].end) + "%,";
    }

    returnString += colorA + " 100%);";
    return returnString;
}




playButton.addEventListener("click", function(){
    console.log(wavesurfer.isPlaying())
        
    console.log("is playing")

    toggleAudio()
    wavesurfer.playPause();

    
});


volumeButton.addEventListener("click", function(){
    var inc = .2;
    if(audio.volume + inc > 1){
        audio.volume = 0;
    }
    else{
        audio.volume += inc;
    }
    console.log("volume" + audio.volume);
});
var toggleAudio = function(){
    if(wavesurfer.isPlaying()){
        playButton.classList.remove("fa-pause")
        playButton.classList.add("fa-play") 
        
    }
    else{
        playButton.classList.remove("fa-play")
        playButton.classList.add("fa-pause") 
    }
}
