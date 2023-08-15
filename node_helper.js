const NodeHelper = require("node_helper");
const express = require("express");

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting node helper for: " + this.name);
		this.expressApp.use(express.urlencoded({ extended: true }));
		this.expressApp.post('/indoor-temperature', this._onTemperatureValueReceived.bind(this));
		this.expressApp.post('/indoor-humidity', this._onHumidityValueReceived.bind(this));

		this.temperature = undefined;
		this.humidity = undefined;
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "REQUEST_INDOOR_TEMPERATURE") {
			if (this.temperature) {
				this._sendTemperature();
			}
		} else if (notification === "REQUEST_INDOOR_HUMIDITY") {
			if (this.humidity) {
				this._sendHumidity();
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

	_onHumidityValueReceived: function(req, res) {
		if (!req.body.humidity || isNaN(req.body.humidity)) {
			res.sendStatus(400);
			return;
		}

		this.humidity = Number(req.body.humidity);
		this._sendHumidity();

		res.sendStatus(200);
	},


	_sendTemperature: function() {
		this.sendSocketNotification('INDOOR_TEMPERATURE', this.temperature);
	},

	_sendHumidity: function() {
		this.sendSocketNotification('INDOOR_HUMIDITY', this.humidity);
	}
});
