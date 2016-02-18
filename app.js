// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var fs = require('fs')
// Create Express App Object \\
var app = express();
var places = require('./info.js')



// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes \\
var destinations = ['destination1' ,'destination2', 'destination3','destination4','destination5','destination6']

app.get('/', function(req, res){
  res.sendFile('public/main.html', {root : './'})
})

app.get('/:destination', function(req,res,next){
	var goodLocation = null;
	for(var i = 0; i < destinations.length; i++){
		if (req.params.destination === destinations[i])	{
			goodLocation = true
  				
		} 
	}
	if (goodLocation){
		res.sendFile('public/' + req.params.destination + '.html', {root : './'})
		console.log(req.query.destination , '!!!')

		if (req.query.destination === 'seville') {
		 	res.send(places[0])
		}
		else if (req.query.destination === 'canaryislands'){
			res.send(places[1])
		}
	}
	else{
		next()
	}
})

app.use(function(req,res){
	res.send('you cant go here because its not a part of magellans voyage')
});


// app.use(function(err, req, res, next) {
//   console.log('404 error')
//   res.status(err.status || 404);
//   res.send('not handled by other routes')
// });


// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);
})

