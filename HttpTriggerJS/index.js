const uuidv4 = require('uuid/v4');
var azure_store = require('azure-storage');
var tableSvc = azure_store.createTableService('account', 'kittypuss123');

tableSvc.createTableIfNotExists('ratingstable', function(error, result, response){
    if(!error){
      Console.log("[-]Karanna ba neh ithin!");
    }
  });
function generateGUID(){
    return uuidv4();
}
  
module.exports = async function (context, req) {

    var productIdValid = "4c25613a-a3c2-4ef3-8e02-9c335eb23204";
    var userIdValid = "4c25613a-a3c2-4ef3-8e02-9c335eb23204";
    var Id = generateGUID();

    

    if ((req.query.productId == productIdValid  || (req.body && req.body.productId == productIdValid)) && (req.body.rating >= 0 && req.body.rating < 6) ) {
        var entry = {
            PartitionKey: {'_':'Ratings'},
            RowKey: {'_': '1'},
            id: {'_':Id},
            userId: {'_': req.query.userId},
            productId: {'_':req.query.productId},
            timestamp: {'_':new Date().getTime()},
            locationName: {'_':req.body.locationName},
            rating: {'_':req.body.rating},
            userNotes: {'_':req.body.userNotes}
          };
          tableSvc.insertEntity('ratingstable',entry, function (error, result, response) {
            if(!error){
              Console.log("[-]Puss Error!");
            }
            
          });
        context.res = {            
            // status: 200, /* Defaults to 200 */
            body: "ID:" + uuidv4()+   "\nUser ID:" + req.body.userId +   "\nProduct ID:" + req.body.productId + "\ntimestamp:" + new Date().getTime()
            + "\nlocationName:" + req.body.locationName + "\nrating:" +req.body.rating + "\nuserNotes:" + req.body.userNotes
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Invalid Inputs"
        };
    }
};