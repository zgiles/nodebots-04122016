'use strict';
const five = require('johnny-five');
const board = new five.Board(); 

let led = []; 
let button;
let pot;
let poti = 0;
let mode = 1;
let x = 0;

const onpress = function() {
	mode = mode % 3;
	x=0;
}

const intto8bit = (input) => {
        let b = (input+16384).toString(2);
	console.log(b);
        return [
                b[14] == '1',
                b[13] == '1',
                b[12] == '1',
                b[11] == '1',
                b[10] == '1',
                b[9] == '1',
                b[8] == '1',
                b[7] == '1',
                b[6] == '1',
                b[5] == '1'
                ];
}

const updateled = (l, a) => {
	console.log(a);
	for(let i=0; i<l.length; i++) {
		if(a[i] == true) {
			l[i].on();
		} else {
			l[i].off();
		}
	}
}

const modeupdate = function(l, v) {
	switch(mode) {
		case 1: // random
			updateled(led, intto8bit(Math.floor(Math.random()*100000)%256));
		case 2: // count up
			updateled(led, intto8bit(x));
			x++;
		case 3: // pot
			if(poti != v) { 
				updateled(led, intto8bit(Math.floor(v)));
				poti = v;
			}
		default:
			updateled(led, intto8bit(256));	
	}
}

const onready = function() {
	led[0] = new five.Led(10);
	led[1] = new five.Led(9);
	led[2] = new five.Led(8);
	led[3] = new five.Led(7);
	led[4] = new five.Led(6);
	led[5] = new five.Led(5);
	led[6] = new five.Led(4);
	led[7] = new five.Led(3);
	led[8] = new five.Led(2);
	pot = new five.Sensor({
		pin: 'A0', 
		freq: 25, 
	});
	button = new five.Button(11);
	button.on("press", onpress);

	let y = setInterval(() => {
		modeupdate(led, poti);
	}, 100);
	
	
	pot.scale([0, 256]).on("data", function() {
		if(poti != this.value) { 
			// updateled(led, intto8bit(Math.floor(this.value)));
			poti = this.value;
		}
	});

	// random
	/*	
	let y = setInterval(() => {
		updateled(led, intto8bit(Math.floor(Math.random()*100000)%256));
	}, 100);
	*/

	// counter
	/*	
	let x = 0;
	let y = setInterval(() => {
		updateled(led, intto8bit(x));
		x++;
	}, 100);
	*/

	this.repl.inject({ led });
}

board.on("ready", onready); 

