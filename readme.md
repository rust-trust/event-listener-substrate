# Substrate Events Listener + Data Storage Adapter

A simple node.js based web-socket listener which subscribes to Parity Substrate runtime events and stores them in a data store. At the moment, MongoDB is supported but new stores can be added easily.

Substrate node and data sink related config lives in the `.env` file.

## Why?

Ideally, we should avoid running iterators and loops on the on-chain data stored in the blockchain runtime or contracts. The chain should store the minimum amount of data which is needed for conflict resolution. Everything else can and should be stored off-chain with it's hash on the chain.

In cases where on-chain data is stored in lists or maps and needs to be shown in a list on a UI, an event based approach can be used. This listener listens to all Substrate runtime events using the web-socket connection, parses each event based on custom rules and then stores them into one or more data stores. This way, an off-chain storage can be primed using the blockchain events which can be queried and shown from a frontend easily.

## Usage

1. Clone this repository.
2. Make sure your Substrate node and MongoDB is running. Update the `.env` file with the server and ports, if needed.
3. Set event section filters (comma separated list of module names, no spaces) in the `.env` file to filter events,

```
SUBSTRATE_EVENT_SECTIONS=all
```
```
SUBSTRATE_EVENT_SECTIONS=balances,assets,token
```

4. Run the following docker command to build the image,

```
docker build -t substrate-listener .
```

5. Run the following docker command to start the listener in a container,

```
docker run -d substrate-listener
```

## Add new data stores

To use a new data store with the listener,

1. Create the js client in the `data_adaptors` dir (similar to mongo client)
2. Import the new js client in `dataService.js`
3. Use init() for initializing the client - connection, priming, etc.
4. Use insert() for (of course) inserting substrate events data