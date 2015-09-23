var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();

exports.handler = function(event, context) {
    console.log(JSON.stringify(event, null, '  '));
    
    var bname = event.name.replace(/\W/g, '');
    bname = bname.charAt(0).toUpperCase() + bname.slice(1);
    
    dynamodb.updateItem({
        "TableName": "baby-names",
		"Key" : {
			name : bname
		},
		"UpdateExpression" : "SET votes = votes + :a",
		"ExpressionAttributeValues" : {
			":a" : 1
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