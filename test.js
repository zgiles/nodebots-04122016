'use strict';
const five = require('johnny-five');
const board = new five.Board(); 

let led = []; 
let button;

const g_onpress = function(i) {
	return () => {
	console.log("Button pressed");
	led[i].on();
	}
}

const g_onrelease = function(i) {
	return () => {
	console.log("Button released");
	led[i].off();
	}
}

const onready = function() {
	led[0] = new five.Led(2);
	led[1] = new five.Led(3);
	led[2] = new five.Led(4);
	button = new five.Button(11);
	button.on("press", g_onpress(2));
	button.on("release", g_onrelease(2));
	// led[0].blink(30);
	this.repl.inject({ led, button });
}

board.on("ready", onready); 

