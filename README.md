# MMM-IndoorTemperature-Endpoint
[Magic Mirror](https://magicmirror.builders/) Module - Creates an endpoint that can receive a POST-request for indoor temperature and forwards it as an event internally. So the indoor temperature can be provided without creating a special module for just that kind of thermometer (in my case using Tellstick).

## Install
1. Clone repository into ``../modules/`` inside your MagicMirror folder.
2. Add the module to the Magic Mirror config without position and header.
```
{
  module: "MMM-IndoorTemperature-Endpoint",
  config: {}
}
```
3. Done!

## Send data to the module
An example how to provide the magic mirror with an indoor temperature.

``curl -X POST -d 'temp=<VALUE>' http://<IP>:<PORT>/indoor-temperature``

Where the arguments are:
1. VALUE: the degrees of the indoor temperature
2. IP: the ip address to the magic mirror
3. PORT: the port that magic mirror is listening to
