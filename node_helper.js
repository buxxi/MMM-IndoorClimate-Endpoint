const NodeHelper = require("node_helper");
const express = require("express");

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting node helper for: " + this.name);
		this.expressApp.use(express.urlencoded());
		this.expressApp.post('/indoor-temperature', this._onTemperatureValueReceived.bind(this));

		this.temperature = undefined;
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification == "REQUEST_INDOOR_TEMPERATURE") {
			if (this.temperature) {
				this._sendTemperature();
			}
		}
	},

	_onTemperatureValueReceived: function(req, res) {
		if (!req.body.temp || isNaN(req.body.temp)) {
			res.sendStatus(400);
			return;
		}

		this.temperature = Number(req.body.temp);
		this._sendTemperature();
	
		res.sendStatus(200);
	},


	_sendTemperature: function() {
		this.sendSocketNotification('INDOOR_TEMPERATURE', this.temperature);
	}
});
