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