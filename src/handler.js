const Joi = require('@hapi/joi')
const { randomUUID } = require('node:crypto')
const { PutItemCommand, QueryCommand, ListTablesCommand } = require('@aws-sdk/client-dynamodb')

class Handler {
    constructor({dynamoDbSvc}) {
        this.dynamoDbSvc = dynamoDbSvc
        this.dynamoTable = 'Heroes'
    }

    static validator() {
        return Joi.object({
            name: Joi.string().max(100).min(2).required(),
            power: Joi.string().max(50).min(2).optional(),
        })
    }

    async main(event) {
        const data = event.body; 

        const params = this.prepareData(data)

        const insertItem = new PutItemCommand(params)

        const responseInsert = await this.dynamoDbSvc.send(insertItem);

        const insertedItem = new QueryCommand({
            TableName: this.dynamoTable,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ":id": params.Item.id
            }
        });

        const response = await this.dynamoDbSvc.send(insertedItem);

        return {
            statusCode: 200,
            body: JSON.stringify(response)
        } 
    }

    prepareData(data) {
        return {
            TableName: this.dynamoTable,
            Item: {
                id: {
                    S: randomUUID()
                },
                name: {
                    S: data.name
                }
            }
        };
    }
}

module.exports = Handler