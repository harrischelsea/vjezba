const net = require('net');
var klijenti = [];
var id = 0;


const server = net.createServer((socket) => {
    id++;
    socket.mojeIme = '';

    klijenti.push(socket);
    socket.name = "Klijent" + id;

    console.log(socket.name + ' se pridruzio razgovoru.');

    socket.on('data', (data) => {
        const request = JSON.parse(data);
        if (request.action === 'IME') {
            console.log('Korisnik je registrovao ime ', request.value);
            socket.mojeIme = request.value;

            let sviOnline = klijenti.map(el => el.mojeIme);
            socket.write(JSON.stringify(sviOnline));

        }
        else if (request.action === 'PORUKA') {
            console.log(request.name, ' je poslao poruku: ', request.value);
            for (let i = 0; i < klijenti.length; i++) {
                if (klijenti[i].mojeIme == request.receiver) {
                    klijenti[i].write(request.name+ ': '+ request.value);
                }
            }
        }
        //console.log(socket.name + ' poslao: ' + data);

        //poruka(socket, data);
    });

    var klijent = '';
    socket.on('end', () => {
        klijenti.splice(klijenti.indexOf(socket), 1);
        klijent = socket.name;
        poruka(socket, socket.name + ' se odjavio!');

    });

    socket.on('close', () => {
        console.log(klijent + ' se diskonektovao');
    });

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

function poruka(salje, poruka){
    for (let i = 0; i < klijenti.length; i++){
        if (klijenti[i] != salje) {
            klijenti[i].write(salje.name + ': ' + poruka);
        }
    }
}