const db = require('../data/dbConfig')
const model = 'users'

module.exports = {
    add: async(user) => {
        const id = await db(model).insert(user)
    
        return findBy({id})
    },

    all: () => db(model),
    
    findBy: filter => db(model).where(filter).first()
}

