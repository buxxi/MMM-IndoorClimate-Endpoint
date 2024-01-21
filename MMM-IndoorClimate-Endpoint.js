Module.register("MMM-IndoorClimate-Endpoint",{
	defaults: {},

	start: function() {
		//Start up the communication channel, can't receive request without first sending a notification
		this.sendSocketNotification("REQUEST_INDOOR_TEMPERATURE", this.config);
		this.sendSocketNotification("REQUEST_INDOOR_HUMIDITY", this.config);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "INDOOR_TEMPERATURE") {
			this.sendNotification("INDOOR_TEMPERATURE", payload);	
		} else if (notification === "INDOOR_HUMIDITY") {
			this.sendNotification("INDOOR_HUMIDITY", payload);
		}
	},
});
