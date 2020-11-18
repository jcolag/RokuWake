const { RokuClient, Keys } = require('roku-client');

let searchName = '';

if (process.argv.length > 2) {
  searchName = process.argv[2].toLowerCase();
}

RokuClient
  .discoverAll(30000)
  .then((clients) => {
    const info = clients.map((client) => [
      client.active(),
      client.info(),
      client.ip,
    ]);

    return Promise.all(info.flat());
  })
  .then((array) => {
    let devices = [];

    while (array.length) {
      const chunk = array.splice(0, 3);

      if (chunk[1].friendlyDeviceName.toLowerCase().indexOf(searchName) >= 0
         || chunk[1].userDeviceLocation.toLowerCase().indexOf(searchName) >= 0) {
        devices.push({
          address: chunk[2],
          client: new RokuClient(chunk[2]),
          info: chunk[1],
          open: chunk[0],
        });
      }
    }

    if (devices.length === 1) {
      const dev = devices[0];

      console.log(
        `${dev.info.friendlyDeviceName} ` +
        `(${dev.info.userDeviceLocation}) ` +
        `- ${dev.address}`
      );
      dev.client
        .command()
        .power()
        .wait(30000)
        .home()
        .home()
        .send()
        .then((val) => { console.log(val); })
        .catch((err) => { console.log(err); });
    } else {
      console.log('Here are the devices we could find:');
      console.log(devices);
    }
  })
  .catch((err) => {
    console.error(err.stack);
  });

