const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let mojeIme = '';
let resiver = '';

function pisi() {
    rl.question('Reci nesto svima! \n', (answer) => {
        // TODO: Log the answer in a database
        console.log(`Rekli ste: ${answer}`);
        if (answer.toString() === 'exit') {
            client.destroy();
            process.exit();
        } else if (answer.toString() === 'close'){
            privateChat();
        } else {
            const response = {
                action: "PORUKA",
                value: answer,
                name: mojeIme,
                receiver: resiver
            }
            client.write(JSON.stringify(response, null, 2));
            pisi();
        }
    });
}

function ime(){
    rl.question('Kako se zoves? \n', (ime) => {
        // TODO: Log the answer in a database
        console.log(`Rekli ste: ${ime}`);
        const response = {
          action: "IME",
            value: ime
        };
        mojeIme = ime;
        client.write(JSON.stringify(response, null, 2));
        //pisi();
        privateChat();
    });
}

function privateChat() {
    rl.question('S kim ces da pricas? \n', (ime) => {
        // TODO: Log the answer in a database
        console.log(`Rekli ste: ${ime}`);
        resiver = ime;
        pisi();
        //pisi();
    });
}

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
    ime();
});

client.on('data', (data) => {
    console.log('klijent primio: ' + data + ' \n');
    pisi();
});


client.on('close', () => {
    client.write('Korisnik je napustio chat');
});
/*
client.on('connect', () => {
    console.log('konektovani ste');
});
*/