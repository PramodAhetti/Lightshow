const express=require('express');
const http=require('http');
const {Server}=require('socket.io');

const app=express();
const fs=require('fs');
const server=http.createServer(app);
const io= new Server(server);

app.use(express.json());

const hashMap={};
module.exports.hashMap=hashMap;
module.exports.io=io;
module.exports.app=app;
module.exports.server=server;