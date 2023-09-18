const { DynamoDb } = require('./factory')
const Handler = require('./handler')
const { decoratorValidator } = require('./util')

const handler = new Handler({
    dynamoDbSvc: DynamoDb
})

const heroesTrigger = async(event) => {
    console.log(event)
}

const heroesInsert = decoratorValidator(handler.main.bind(handler), Handler.validator(), 'body')

module.exports = {
    heroesTrigger,
    heroesInsert
}