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

router.get('/rides', async function (req, res) {
    const [rides] = await sequelize.query("SELECT * FROM ride")

    for (let ride of rides) {
        const [res] = await sequelize.query(`SELECT user_id FROM users_rides WHERE ride_id=${ride.id} AND type="driver"`)
        if (res[0]) {
            const driverId = res[0].user_id
            const [driver] = (await sequelize.query(`SELECT * FROM user WHERE id=${driverId}`))[0]
            ride.driver = driver
        }
    }
    res.send(rides)
})

router.post('/ride', async function (req, res) {//add new ride
    const ride = req.body
    const result = await sequelize
        .query(`INSERT INTO ride VALUES(null, '${ride.location}', '${ride.destination}', ${ride.departureTime}, ${ride.distance}, ${ride.isDone})`)
    const rideId = result[0]

    const driver = await sequelize
        .query(`INSERT INTO users_rides VALUES(${ride.driver.id},${rideId},"driver",null)`)

    res.send(result)
})
router.post('/ride/:passengerId/:rideId', async function (req, res) {//request ride
    const passengerId = req.params.passengerId
    const rideId = req.params.rideId

    const passenger = await sequelize
        .query(`INSERT INTO users_rides VALUES(${passengerId},${rideId},"passenger","pending")`)

    res.send(passenger)
})
router.put('/ride/:passengerId/:rideId', async function (req, res) {//approve ride
    const rideId = req.params.rideId
    const passengerId = req.params.passengerId
    const query = `UPDATE users_rides
                SET status = "approved"
                WHERE user_id=${passengerId} AND ride_id = ${rideId};`
    const passenger = await sequelize.query(query)
    res.send(passenger)
})
router.put('/ride/:rideId', async function (req, res) {//approve ride
    const rideId = req.params.rideId
    const query = `UPDATE ride
                SET is_done = 1
                WHERE id = ${rideId};`
    const result = await sequelize.query(query)
    res.send(result)
})
router.delete('/ride/:id', async function (req, res) {
    const id = req.params.id
    await sequelize
        .query(`DELETE FROM users_rides WHERE ride_id=${id}`)
    const result = await sequelize
        .query(`DELETE FROM ride WHERE id=${id}`)

    res.send(result)
})

module.exports = router