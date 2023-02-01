const { sequelize } = require('../db/connect')
const { Users } = require('../Models/Users')

const user = async (req, res) => {
    try {
        const user = await Users.findAll({
            order: [
                ['user_id', 'ASC']
            ]
        })
        res.status(200).json(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

module.exports = { user }