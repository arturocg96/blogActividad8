require('dotenv').config();
const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => {
    console.log(error);
});
