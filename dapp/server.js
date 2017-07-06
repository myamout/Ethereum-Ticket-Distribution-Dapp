import express from 'express';
import contractApi from './contractApi';

const app = express();

app.use(express.static(__dirname + '/dist'));
app.use('/scripts', express.static(__dirname + '/node_modules/wingcss/dist'));
app.use('/api', contractApi);

app.listen(1337);
console.log('[+] Server listening on port 1337');