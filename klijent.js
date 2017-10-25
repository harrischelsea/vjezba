const net = require('net');

const client = new net.Socket();
client.connect(80, '127.0.0.1', function() {
    console.log('Connected');
    /*
    setInterval(() => {
        const time = new Date();
        //const time2 = moment().format('LLLL');
        client.write(time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+ '   ');
        //client.write(time2);
    }, 1000);
    */
});

client.on('data', (data) => {
    console.log('klijent primio: ' + data);
});

client.on('connect', () => {
    console.log('konektovani ste');
});