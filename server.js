const express = require('express');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(3000, 'localhost' || '10.100.102.12');


