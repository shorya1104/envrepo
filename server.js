require("dotenv").config();
const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const cors       = require('cors');
const logger     = require('logger').createLogger('development.log')


const Prometheus = require('prom-client');
let ready = false; // Application readiness status
// Create a Prometheus counter to track the number of requests
const counter = new Prometheus.Counter({
    name: 'myapp_requests_total',
    help: 'Number of requests received',
    labelNames: ['method']
  });

// @Init App
const app = express();

// Increment the counter for each request
app.use((req, res, next) => {
    counter.inc({ method: req.method });
    next();
  });

app.set('deviceKey', 'Prem_Maurya');
const http = require('http').Server(app);
const io   = require('socket.io')(http);
require("./DBConnection");

  

// @Route Define
var area        = require('./routes/areaManage')(io);
var User        = require('./routes/EnvDevice');
var memberRoute = require('./routes/memberRoute');
var teamRoute   = require('./routes/teamRoute');

app.use(bodyParser.json({ limit: '500000mb' }));
app.use(bodyParser.urlencoded({ limit: '500000mb', extended: true, parameterLimit: 10000000000 }));

// @Set Static Folder
// app.get('*', express.static(path.join(__dirname, 'build')));

app.use(express.static(path.join(__dirname, "build")));



app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
    const allowedOrigins = ['https://env.shunyaekai.com','http://192.168.1.41:3030'];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Accept, Authorization, authorization');
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET, POST, PUT, DELETE');
    next();
});

app.use(cors());
app.use(cors({
    exposedHeaders: ['Authorization', 'authorization', 'x-api-key', 'x-token', 'x-authorization', 'x-Authorization',],
}));

// @Router Call
app.use('/api', area);
app.use('/api', User);
app.use('/api', memberRoute);
app.use('/api', teamRoute);

app.get('/health', (req, res) => {
  res.send({status:200,message:"OK"});
});
app.get('/env/api/live', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Liveness probe: OK');

});
app.get('/env/api/ready', (req, res) => {
  if (ready) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Readiness probe: OK');
  } else {
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Readiness probe: NOT READY');
  }

});
// Register the Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    try {
      res.set('Content-Type', Prometheus.register.contentType);
      const metrics = await Prometheus.register.metrics();
      res.end(metrics);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  });
  

app.get("*", (req, res, next) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


const start = async () => {
    try {
        http.listen(process.env.PORT, (err) => {
            if (err) throw err;
            ready = true;
            console.log(`Listing To port ${process.env.PORT}`);
        })
    } catch (err) {
        console.log(err);
    }
}
start();
