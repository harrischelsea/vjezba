const net = require('net');
const moment = require('moment');
moment.locale('bs');
const server = net.createServer((socket) => {

    socket.on('data', (data) => {
            console.log('poslao: ' + data);

            socket.write(data);
        });

    socket.write('sta ima jos');

}).on('error', (err) => {
    // handle errors here
    throw err;
});

// grab an arbitrary unused port.
server.listen({
  port:80
},() => {
    console.log('opened server on', server.address());
});

///////////////////////////////////////
