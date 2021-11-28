const Logger = require('./logger');
const logger = new Logger();
const path = require('path')
const os = require('os');
const fs = require('fs');


const dir = path.parse(__filename);
console.log('Directory name : ' ,dir);
console.log('Total Memory : ' +os.totalmem);
console.log('Free Memory : ' + os.freemem);

fs.readdir('./', function (err, files) {
    if (err) {
        console.log('Error : ' , err.message);
    }
    else {
        console.log('Result : ' ,files);
    }
})



logger.on('raiseEvent', (arg) => {
    console.log('Raise Event is received  ',arg);
});

logger.Log("Hello Jennifer, How are you?");

const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        console.log('aaaaaa');
        res.write('Hello World');
        res.end();
    } else if(req.url === '/api/courses') {
         console.log('course');
        res.write(JSON.stringify([{ id: 1, name: 'C++' }, { id: 2, name: 'C#' }]));
         res.end();
    }
});

server.listen(3000, () => {
    console.log("Listening to port  3000");
});

