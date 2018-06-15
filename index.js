var express = require("express")
var path = require("path")
var app = express()

app.use(express.static('static'))
app.listen(3000, function(){
 console.log("server started")
})

app.get( "/", ( req, res ) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});