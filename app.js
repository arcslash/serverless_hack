var http = require('http');
var express = require('express');
app = express();

app.get("/product/:id",function(request, response){
    var id = request.params.id;
    
    var mes = "The product name for your product id " + id + " is Starfruit Explosion and the description is This starfruit ice cream is out of this world!";

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(mes);
});

app.listen(3000, () => console.log('Running on port 3000'))
