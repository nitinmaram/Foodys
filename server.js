var path = require('path');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var restaurants = require('./webserver/routes/restaurants');
var users = require('./webserver/routes/users');
var app = express();
var compiler = webpack(config);
var fs = require('fs');
var https = require('https');
var options = {
  key: fs.readFileSync('key.pem', 'utf8'),
  cert: fs.readFileSync('server.crt', 'utf8'),
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));


//Mongoose
var db = 'mongodb://localhost/jojo';
mongoose.connect(db);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connnected with mongo");
});



//Ruotes
app.use('/users',users);
app.use('/restaurants', restaurants);


app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
}));

app.use(webpackHotMiddleware(compiler));


var server = https.createServer(options, app);
//Listening to port 8081
server.listen(8081);
server.on('error', ()=> 'Listening');
server.on('listening', () => 'Listening');
// app.listen(8081, '0.0.0.0', function(err, result) {
//     if (err) {
//         console.error("Error ", err);
//     }
//
//     console.log("Server started at 8081");
// });
