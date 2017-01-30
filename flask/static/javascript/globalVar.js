var sliderStart = document.getElementById("sliderStart")
var sliderEnd = document.getElementById("sliderEnd")
var colorBar = document.getElementById("colorBar")

var audioElement = document.getElementById("audio");
var playButton = document.getElementById("playButton");
var volumeButton = document.getElementById("volumeButton");
var submitButton = document.getElementById("submit");

var clipHereButton = document.getElementById("clipHere");

var sizeSlider = 1000;

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