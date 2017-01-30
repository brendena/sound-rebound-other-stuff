/*
These two examples
http://chimera.labs.oreilly.com/books/1234000001552/ch05.html#s05_1

https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

*/

// Assume that node A is ordinarily connected to B.
/*
https://developers.google.com/web/updates/2012/02/HTML5-audio-and-the-Web-Audio-API-are-BFFs
*/

var audioDiv = document.getElementById('audio');

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var source = context.createMediaElementSource(audioDiv);
source.connect(analyser);
var analyser = context.createAnalyser();
analyser.connect(context.destination);






var freqDomain = new Float32Array(analyser.frequencyBinCount);
analyser.getFloatFrequencyData(freqDomain);

function getFrequencyValue(frequency) {
  var nyquist = context.sampleRate/2;
  var index = Math.round(frequency/nyquist * freqDomain.length);
  return freqDomain[index];
}

window.requestAnimationFrame = (function(){
return window.requestAnimationFrame  ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback){
  window.setTimeout(callback, 1000 / 60);
};
})();


var freqDomain = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(freqDomain);
for (var i = 0; i < analyser.frequencyBinCount; i++) {
  var value = freqDomain[i];
  var percent = value / 256;
  var height = HEIGHT * percent;
  var offset = HEIGHT - height - 1;
  var barWidth = WIDTH/analyser.frequencyBinCount;
  var hue = i/analyser.frequencyBinCount * 360;
  drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
  drawContext.fillRect(i * barWidth, offset, barWidth, height);
}


var timeDomain = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteTimeDomainData(freqDomain);
for (var i = 0; i < analyser.frequencyBinCount; i++) {
  var value = timeDomain[i];
  var percent = value / 256;
  var height = HEIGHT * percent;
  var offset = HEIGHT - height - 1;
  var barWidth = WIDTH/analyser.frequencyBinCount;
  drawContext.fillStyle = 'black';
  drawContext.fillRect(i * barWidth, offset, 1, 1);
}