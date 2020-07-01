const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql://root:@localhost/oneroad_db')
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })


router.get('/users-rides', function (req, res) {
    sequelize
        .query("SELECT * FROM users_rides")
        .then(results => {
            res.send(results[0])
        })
})
router.get('/users', function (req, res) {
    sequelize
        .query("SELECT * FROM user")
        .then(results => {
            res.send(results[0])
        })
})
router.post('/user', function (req, res) {
    const user = req.body
    sequelize
        .query(`INSERT INTO user VALUES(null, '${user.name}', '${user.phone}', ${user.income}, ${user.expense})`)
        .then(function (result) {
            res.send(result)
        })
})

router.delete('/user/:id', function (req, res) {
    const id = req.params.id
    sequelize
        .query(`DELETE FROM user WHERE id=${id}`)
        .then(function (result) {
            res.send(result)
        })
})

router.get('/rides', function (req, res) {
    sequelize
        .query("SELECT * FROM ride")
        .then(results => {
            res.send(results[0])
        })
})
router.post('/ride', function (req, res) {
    const ride = req.body
    sequelize
        .query(`INSERT INTO ride VALUES(null, '${ride.location}', '${ride.destination}', ${ride.departureTime}, ${ride.distance}, ${ride.isDone})`)
        .then(function (result) {
            res.send(result)
        })
})
router.post('/ride/:passengerId?', async function (req, res) {
    const ride = req.body
    const passengerId = req.params.passengerId
    const result = await sequelize
        .query(`INSERT INTO ride VALUES(null, '${ride.location}', '${ride.destination}', ${ride.departureTime}, ${ride.distance}, ${ride.isDone})`)
    const rideId = result[0]
    if (!passengerId) {
        const driver = await sequelize
            .query(`INSERT INTO users_rides VALUES(${ride.driver.id},${rideId},"driver",null)`)
    }
    else {
        const passenger = await sequelize
            .query(`INSERT INTO users_rides VALUES(${passengerId},${rideId},"passenger","pending")`)
    }
    res.send(result)
})
router.put('/ride/:passengerId?/:rideId?', async function (req, res) {
    const rideId = req.params.rideId
    const passengerId = req.params.passengerId
    const query = `UPDATE users_rides
                SET status = "approved"
                WHERE user_id=${passengerId} AND ride_id = ${rideId};`
    const passenger = await sequelize.query(query)
    res.send(passenger)
})

module.exports = router