var fs = require('fs');
var exec = require('child_process').exec;

var bbServos = function(enableA, enableB) {
	this.enableA = false;
	this.enableB = false;
	
	if (enableA || enableA === undefined) {		
		this.enablePWM("A");
	}
	if (enableB || enableB === undefined) {		
		this.enablePWM("B");
	}
}

bbServos.prototype.setPWM = function(pin, pwm) {
	if (pin.toUpperCase() == "A" && this.enableA) {
		fs.writeFileSync("/sys/class/pwm/ehrpwm.0:1/duty_ns",Math.floor(pwm*1000).toString());
	}
	if (pin.toUpperCase() == "B" && this.enableB) {
		fs.writeFileSync("/sys/class/pwm/ehrpwm.0:0/duty_ns",Math.floor(pwm*1000).toString());
	}
}

bbServos.prototype.disablePWM = function(pin) {
	var self = this;
	if (pin.toUpperCase() == "A") {
		fs.writeFile("/sys/class/pwm/ehrpwm.0:1/run","0", function(err) {
			self.enableA = false;
		});
	}
	if (pin.toUpperCase() == "B") {
		fs.writeFile("/sys/class/pwm/ehrpwm.0:0/run","0", function(err) {
			self.enableB = false;
		});
	}
}

bbServos.prototype.enablePWM = function(pin) {
	var self = this;
	if (pin.toUpperCase() == "A") {
		//set pin 31 to PWM
		exec("echo 1 > /sys/kernel/debug/omap_mux/mcasp0_aclkx", function(err) {
			//request control of the PWM
			fs.writeFile("/sys/class/pwm/ehrpwm.0:1/request", "1", function(err) {
				//set the frequency to 50Hz
				fs.writeFile("/sys/class/pwm/ehrpwm.0:1/period_freq", "50", function(err) {
					//specify duty as time in nanoseconds, default to 1500us (standand servo central)
					fs.writeFile("/sys/class/pwm/ehrpwm.0:1/duty_ns", "1500000", function(err) {
						//start the PWM
						fs.writeFile("/sys/class/pwm/ehrpwm.0:1/run","1", function(err) {
							self.enableA = true;
						});
					});
				});			
			});
		});	
	}
	if (pin.toUpperCase() == "B") {
		//set pin 29 to PWM
		exec("echo 1 > /sys/kernel/debug/omap_mux/mcasp0_fsx", function(err) {
			//request control of the PWM
			fs.writeFile("/sys/class/pwm/ehrpwm.0:0/request", "1", function(err) {
				//set the frequency to 50Hz
				fs.writeFile("/sys/class/pwm/ehrpwm.0:0/period_freq", "50", function(err) {
					//specify duty as time in nanoseconds, default to 1500us (standand servo central)
					fs.writeFile("/sys/class/pwm/ehrpwm.0:0/duty_ns", "1500000", function(err) {
						//start the PWM
						fs.writeFile("/sys/class/pwm/ehrpwm.0:0/run","1", function(err) {
							self.enableB = true;
						});
					});
				});			
			});
		});
	}
}

module.exports = bbServos;