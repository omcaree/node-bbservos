node-bb-servos
==============

This module allows you to take control of the two Enhanced High Resolution (EHR) Pulse Width Modulation (PWM) pins on the Beaglebone for the purpose of controlling standard RC servos. These PWM signals are broken out on the P9 connector as pin 31 (ehrpwm0A) and pin 29 (ehrpwm0B). This module generates a 50Hz PWM signal and allows you to specify the pulse time in microseconds. When the module is instansiated the default pulse time is 1500us which corresponds to a center position for a standard servo. By varying this pulse time in the range of 1000-2000us the position of the servo can be changed. NOTE: this module does not prevent you selecting PWM pulses outside of the normal 1000-2000us range as this may be useful for some applications (many servos feature an extended range), be careful what values you set as your servos may be damaged!

See <a href="http://robotcarlambo.blogspot.co.uk/2013/03/pwm-on-beaglebone-interfacing-of-servo.html">here</a> for some background information on taking control of these PWM pins

Installation
============
Install the module with

```
npm install bbservos
```

Usage
=====
The main.js file provides some basic useage information

```
var bbServos = require("./src/bbservos");

//create an instance of bbServos, arguments are whether to enable pin A and pin B respectively
var myServos = new bbServos(true, true);

var pwm1 = 1500;
var step1 = 1;
setInterval(function() {
	//reverse direction when limits reached
	if (pwm1 < 1050 || pwm1 > 1900) {
		step1 = -step1;
	}
	pwm1 += step1;
	myServos.setPWM("A", pwm1);
	
}, 2);

var pwm2 = 1500;
var step2 = 2;
setInterval(function() {
	//reverse direction when limits reached
	if (pwm2 < 800 || pwm2 > 2200) {
		step2 = -step2;
	}
	pwm2 += step2;
	myServos.setPWM("B", pwm2);
	
}, 2);
```