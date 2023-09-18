const AWS = require('@aws-sdk/client-dynamodb')

const dynamoDbConfig = {}

const isLocal = process.env.IS_OFFLINE;

if(isLocal) {
    dynamoDbConfig.region = 'us-east-1'
    dynamoDbConfig.endpoint = 'http://localhost:4566'
    dynamoDbConfig.credentials = {
        accessKeyId: 'test',
        secretAccessKey: 'test'
    }
}

const dynamodb = new AWS.DynamoDBClient(dynamoDbConfig);


module.exports = {
    DynamoDb : dynamodb
}