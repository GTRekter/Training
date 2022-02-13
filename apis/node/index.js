var express = require('express');
var app = express();
var port = process.env.port || 1337;
 
app.get("/healthcheck",function(request, response)
{
    response.json({ Status: "healthy" });
});

app.listen(port, function () {
    var datetime = new Date();
    var message = `Server running on Port: ${port}. Started at: ${datetime}`;
    console.log(message);
});