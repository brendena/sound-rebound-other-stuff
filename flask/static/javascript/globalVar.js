var sliderStart = document.getElementById("sliderStart")
var sliderEnd = document.getElementById("sliderEnd")
var colorBar = document.getElementById("colorBar")

var audioElement = document.getElementById("audio");
var playButton = document.getElementById("playButton");
var volumeButton = document.getElementById("volumeButton");
var submitButton = document.getElementById("submit");

var clipHereButton = document.getElementById("clipHere");

var sizeSlider = 1000;

this.GlobalRegion = "";

var returnObject = {
	fileName: "default", //- i'll have to send this
	//status: "bad", get send with the form
	section:[]
	/*
	example section
	section:[
		{
			start: IDK(FLOAT OR INT ??)
			end:
		},.....
	]
	*/
}

var map = function(x,  in_min, in_max, out_min, out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var mapToAudio = function(x){
	return map(x,0,100, 0,audioElement.duration )
}
var mapToHundred = function(x){
	return map(x,0,audioElement.duration, 0,100 )
}
var mapToSlider = function(x){
	return map(x,0,audioElement.duration, 0,1000 )
}