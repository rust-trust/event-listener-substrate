# Substrate Events Listener + Sink

A simple node.js based web-socket listener which subscribes to Parity Substrate events and stores them in a data sink. At the moment, MongoDB is supported but new sinks can be added easily.

Substrate node and data sink related config lives in the `.env` file.

## Usage

1. Clone this repository.
2. Make sure your Substrate node and MongoDB is running. Update the `.env` file with the server and ports, if needed.
3. Run the following docker command to build the image,

```
docker build -t substrate-listener .
```

4. Run the following docker command to start the listener in a container,

```
docker run -d substrate-listener
```