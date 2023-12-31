
// fn é o main
// schema é a validacao
// argType = body, argString
const decoratorValidator = (fn, schema, argType) => {
    return async function (event) {
        const data = JSON.parse(event[argType])
        const { error, value } = schema.validate(data, {
            abortEarly: false
        })

        // faz com que o event.value venha como json
        // transformando o body
        event[argType] = value

        if(!error) return fn.apply(this, arguments)

        return {
            statusCode: 422,
            body: error.message
        }
    }
}

module.exports = {
    decoratorValidator
}