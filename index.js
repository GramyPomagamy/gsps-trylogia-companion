const config = require('./config.json');
const fs = require('fs');

function sendCompletion() {
    return (fs.readFileSync(config.completionFile, 'utf8').slice('21')).replace(/\s+/g, '');
};

function sendSong() {
    return fs.readFileSync(config.nowPlayingFile, 'utf8');
};

const io = require('socket.io')(config.port);

io.on('connection', (socket) => {
    console.log('Client connected.');
    socket.emit('song', sendSong());
    socket.emit('completion', sendCompletion());

    fs.watch(config.nowPlayingFile, () => {
        socket.emit('song', sendSong());
    });

    fs.watch(config.completionFile, () => {
        socket.emit('completion', sendCompletion());
    });
});
  
io.on('disconnect', function close() {
  console.log('Client disconnected.');
});

