const db = require('../data/dbConfig')
const model = 'users'

module.exports = {
    add,
    getAll,
    findby
}

const all = () => db(model)

const findBy = filter => all.where(filter)

const add = user => {
    const id = await all.insert(user)

    return findBy({id}).first()
}

