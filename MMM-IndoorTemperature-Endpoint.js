Module.register("MMM-IndoorTemperature-Endpoint",{
	defaults: {},

	start: function() {
		//Start up the communication channel, can't receive request without first sending a notification
		this.sendSocketNotification("REQUEST_INDOOR_TEMPERATURE", this.config);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification == "INDOOR_TEMPERATURE") {
			this.sendNotification("INDOOR_TEMPERATURE", payload);	
		}
	},
});
