const EventEmitter = require('events');

class Logger extends EventEmitter
{
     Log(msg)
    {
        console.log(msg);
        this.emit('raiseEvent',{id:1,name:'Jennifer'});
    }
}

module.exports = Logger;