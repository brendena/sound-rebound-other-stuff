//probable should put this on the main object   
/*
sliderStart.addEventListener("keypress", function(event){
    var x = event.which || event.keyCode
    //example
    if(x == 27){
        
    }
});
*/

window.onload = function(){
    changeSlider();
};




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


clipHereButton.addEventListener("click", function(event){
	console.log("Clip here");
	/*example
	duration = 120
	startPercent = .50
	outcome = 60
	*/
	event.preventDefault();
	startPercent = sliderStart.value / sizeSlider;
	endPercent = sliderEnd.value / sizeSlider;
	var start = audioElement.duration * startPercent; 
	var end = audioElement.duration * endPercent;
	
	returnObject["section"].push({
		start: start,
		end: end
	})
	
	console.log(returnObject["section"])
});


var form = $(this).closest('form');

submitButton.addEventListener("click", function(event){
    document.getElementById("clippedSection").value = JSON.stringify(returnObject.section)
});
    

