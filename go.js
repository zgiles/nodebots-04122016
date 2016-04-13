'use strict';
const five = require('johnny-five');
const board = new five.Board(); 

let led; 
let button;

const g_onpress = function(led) {
	return () => {
	console.log("Button pressed");
	led.stop();
	led.off();
	}
}

const g_onrelease = function(led) {
	return () => {
	console.log("Button released");
	}
}

const onready = function() {
	led = new five.Led(11);
	button = new five.Button(2);
	button.on("press", g_onpress(led));
	button.on("release", g_onrelease(led));
	led.blink(30);
	this.repl.inject({ led, button });
}

board.on("ready", onready); 

