const NodeHelper = require("node_helper");
const express = require("express");

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting node helper for: " + this.name);
		this.expressApp.use(express.urlencoded({ extended: true }));
		this.expressApp.post('/indoor-climate', this._onClimateValueReceived.bind(this));

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

	_onClimateValueReceived: function(req, res) {
		const payloadValues = ['temp', 'humidity'];

		if (payloadValues.every(value => req.body[value] !== undefined)) {
			payloadValues.forEach(value => {
				switch (value) {
					case 'temp':
						_onTemperatureValueReceived(req, res);
						break;
					case 'humidity':
						_onHumidityValueReceived(req, res);
						break;

					default:
						break;
				}
			});
			res.sendStatus(200);
		} else {
			res.sendStatus(400);
		}
	},

	_onTemperatureValueReceived: function(req, res) {
		if (isNaN(req.body.temp)) {
			res.sendStatus(400);
			return;
		}

		this.temperature = Number(req.body.temp);
		this._sendTemperature();
	},

	_onHumidityValueReceived: function(req, res) {
		if (isNaN(req.body.humidity)) {
			res.sendStatus(400);
			return;
		}

		this.humidity = Number(req.body.humidity);
		this._sendHumidity();
	},


	_sendTemperature: function() {
		this.sendSocketNotification('INDOOR_TEMPERATURE', this.temperature);
	},

	_sendHumidity: function() {
		this.sendSocketNotification('INDOOR_HUMIDITY', this.humidity);
	}
});
