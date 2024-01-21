# MMM-IndoorClimate-Endpoint
[Magic Mirror](https://magicmirror.builders/) Module - Creates an endpoint that can receive a POST-request for indoor temperature and humidity and forwards it as an event internally. So the indoor temperature and humidity can be provided without creating a special module for just that kind of thermometer.

> :warning: This module has no purpose if being used without a module that can receive the notification ``INDOOR_TEMPERATURE`` or ``INDOOR_HUMIDITY`` (like the standard weathermodule) since this module doesn't display anything, it only forwards the data.

## Install
1. Clone repository into ``../modules/`` inside your MagicMirror folder.
2. Add the module to the Magic Mirror config without position and header.
```
{
  module: "MMM-IndoorClimate-Endpoint",
  config: {}
}
```
3. Done!

## Send data to the module
Some examples how to provide the magic mirror with an indoor temperature or humidity.

``curl -X POST -d '{"temp":<VALUE>, "humidity":<VALUE>}' http://<IP>:<PORT>/indoor-climate``

``curl -X POST -d '{"humidity":<VALUE>}' http://<IP>:<PORT>/indoor-climate``

``curl -X POST -d '{"temp":<VALUE>}' http://<IP>:<PORT>/indoor-climate``

Sending no valid payloadValue results in a 400.

Where the arguments are:
1. VALUE: the degrees of the indoor temperature or humidity
2. IP: the ip address to the magic mirror
3. PORT: the port that magic mirror is listening to
