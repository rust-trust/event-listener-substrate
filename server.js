// Import the API and selected RxJs operators
const { switchMap } = require('rxjs/operators');
const { ApiRx } = require('@polkadot/api');
const dataService = require('./dataService');
const utils = require('./utils');

require('dotenv').config();

// code from https://polkadot.js.org/api/examples/rx/08_system_events/
async function main() {
  const eventsFilter = utils.getEventSections();

  await dataService.init();
  // Create our API with a default connection to the local node
  ApiRx.create()
    .pipe(
      switchMap((api) =>
        // subscribe to system events via storage
        api.query.system.events()
      ))
    // Then we're subscribing to the emitted results
    .subscribe(async (events) => {
      events.forEach(async (record) => {
        // extract the phase, event and the event types
        const { event, phase } = record;

        // check section filter
        if (eventsFilter.includes(event.section.toString()) || eventsFilter.includes("all")) {
          // create event object for data sink
          const eventObj = {
            section: event.section,
            method: event.method,
            meta: event.meta.documentation.toString(),
            data: event.data.toString()
          }

          console.log('Event Received: ' + Date.now() + ": " + JSON.stringify(eventObj));

          // insert in data sink
          await dataService.insert(eventObj);
        }
      });
    });
};

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});