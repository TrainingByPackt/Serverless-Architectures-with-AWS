var AWS = require('aws-sdk');
const doc = new AWS.DynamoDB.DocumentClient();


exports.handler = (event, context, callback) => {

    event.Records.forEach((record) => {
        var params = {
            Item: {
                createdate: Date.now().toString(),
                rawdata: record.kinesis.data,
                message: new Buffer(record.kinesis.data, 'base64').toString('ascii')

            },
            TableName: 'sample-table'
        };

        doc.put(params, function(err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    });
};