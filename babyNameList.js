console.log('Loading event');
var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();

exports.handler = function(event, context) {
    console.log(JSON.stringify(event, null, '  '));
    var datetime = new Date().getTime().toString();
    dynamodb.scan({
        "TableName": "baby-names",
    }, function(err, data) {
        if (err) {
            context.done('error getting items from dynamodb failed: '+err);
        } else {
            context.succeed(JSON.stringify(data.Items, null, '  '));
        }
    });
};