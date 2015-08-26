console.log('Loading event');
var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();

exports.handler = function(event, context) {
    console.log(JSON.stringify(event, null, '  '));
    var name = event.name.replace(/\W/g, '');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    var datetime = new Date().getTime().toString();
    dynamodb.putItem({
        "TableName": "baby-names",
        "Item" : {
            "name": name,
            "datetime": datetime,
            "user": event.user
        }
    }, function(err, data) {
        if (err) {
            context.done('error putting item into dynamodb failed: '+err);
        } else {
            console.log('success: '+JSON.stringify(data, null, '  '));
            context.done();
        }
    });
};