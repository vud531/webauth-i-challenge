const db = require('../data/dbConfig')
const model = 'users'

module.exports = {
    add: user => {
        const id = db(model).insert(user)
    
        return findBy({id})
    },

    all: () => db(model),
    
    findBy: filter => db(model).where(filter).first()
}

