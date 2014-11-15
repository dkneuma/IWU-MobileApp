var express = require('express')
var app = express()
var path = require('path')
app.listen(8000)
var echo = []
//Test Data
var test = "Bacon ipsum dolor sit amet prosciutto shoulder fatback brisket salami swine strip steak sausage capicola corned beef ribeye turducken. Frankfurter leberkas pig, pastrami turducken prosciutto doner pork belly tongue ground round kielbasa turkey. Kielbasa ham biltong, salami boudin jowl short ribs. Capicola leberkas frankfurter, boudin swine rump brisket t-bone drumstick ham spare ribs venison strip steak porchetta. Strip steak fatback beef ribs turkey short loin. Flank short ribs hamburger sausage andouille."
//Console Log because i gotta b sure it workin
console.log('Port 8000')

//send bacon to app
app.get('/text', function(req, res){
	res.json(test)
})

// News XML
app.get('/News', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, 'test.xml'))
})

app.get('/chapel', function(req, res){
	res.sendFile(path.join(__dirname, 'chapelSchedule.xml'))
})

app.get('/food', function(req, res){
	res.sendFile(path.join(__dirname, 'baldwinSchedule.xml'))
})

