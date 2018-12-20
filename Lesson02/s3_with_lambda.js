var AWS = require('aws-sdk');
var s3 = new AWS.S3();

exports.handler = function(event, context, callback) {

    // Retrieve the bucket & key for the uploaded S3 object that
    // caused this Lambda function to be triggered
    var src_bkt = 'lambdas3demo';
    var src_key = 'sample.txt';

    // Retrieve the object
    s3.getObject({
        Bucket: src_bkt,
        Key: src_key
    }, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(err);
        } else {
            console.log('\n\n' + data.Body.toString()+'\n');
            callback(null, data.Body.toString());
        }
    });
};