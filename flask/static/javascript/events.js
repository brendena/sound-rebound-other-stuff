//probable should put this on the main object   
/*
sliderStart.addEventListener("keypress", function(event){
    var x = event.which || event.keyCode
    //example
    if(x == 27){
        
    }
});
*/




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


submitButton.addEventListener("click", function(event){
    document.getElementById("clippedSection").value = JSON.stringify(returnObject.section)
});
    

