sliderStart.onchange = function(value){
    changeSlider();
}


sliderEnd.onchange = function(value){
    changeSlider();
}

var changeSlider = function(){
    var gradientStyle = generateColor(sliderStart.value,sliderEnd.value );
    colorBar.style = gradientStyle;
}

var generateColor = function(start,end){
    var colorA = "#D3D3D3";
    var colorB = "#ff595c";
    
    var pointA = (start / 10) + "%";
    var pointB = (end / 10) + "%";
    console.log(pointA + " " + pointB);
    return "background: linear-gradient(to right," +
                                          colorA + " 0%," +
                                          colorA + " " + pointA + "," +
                                          colorB + " " + pointA + "," +
                                          colorB + " " + pointB + "," +
                                          colorA + " " + pointB + "," +
                                          colorA + " 100%);";
}




playButton.addEventListener("click", function(){
    if(audio.paused == true){
        audio.play();
    }
    else{
        audio.pause();
    }
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
