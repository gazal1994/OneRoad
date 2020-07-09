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
router.put('/user/:type/:id/:amount', async function (req, res) {
    const id = req.params.id
    const amount = req.params.amount
    const type = req.params.type
    const query = `UPDATE user
                SET ${type} = ${amount}
                WHERE id=${id};`
    const result = await sequelize.query(query)
    res.send(result)
})
router.delete('/user/:id', function (req, res) {
    const id = req.params.id
    sequelize
        .query(`DELETE FROM user WHERE id=${id}`)
        .then(function (result) {
            res.send(result)
        })
})
router.get('/locations', async function (req, res) {
    const [locations] = await sequelize.query("SELECT * FROM ride")
    res.send(locations)
})

router.get('/rides', async function (req, res) {
    const [rides] = await sequelize.query("SELECT * FROM ride")

    for (let ride of rides) {
        //get location and destination
        const [location] = await sequelize
            .query(`SELECT id, name, longitude, latitude FROM location WHERE id=${ride.location}`)
        const [destination] = await sequelize
            .query(`SELECT id, name, longitude, latitude FROM location WHERE id=${ride.destination}`)
        ride.location = location[0]
        ride.destination = destination[0]
        //get driver
        let [res] = await sequelize.query(`SELECT user_id FROM users_rides WHERE ride_id=${ride.id} AND type="driver"`)
        if (res[0]) {
            const driverId = res[0].user_id
            const [driver] = (await sequelize.query(`SELECT * FROM user WHERE id=${driverId}`))[0]
            ride.driver = driver
        }
        //get pending passengers
        ride.pendingPassengers = []
        let [res2] = await sequelize.query(`SELECT user_id FROM users_rides WHERE ride_id=${ride.id} AND type="passenger" AND status="pending"`)
        for (let p of res2) {
            let passengerId = p.user_id
            let [passenger] = (await sequelize.query(`SELECT * FROM user WHERE id=${passengerId}`))[0]
            ride.pendingPassengers.push(passenger)
        }
        //get approved passengers
        ride.approvedPassengers = []
        let [res3] = await sequelize.query(`SELECT user_id FROM users_rides WHERE ride_id=${ride.id} AND status="approved"`)
        for (let p of res3) {
            let passengerId = p.user_id
            let [passenger] = (await sequelize.query(`SELECT * FROM user WHERE id=${passengerId}`))[0]
            ride.approvedPassengers.push(passenger)
        }
    }
    res.send(rides)
})

router.post('/ride', async function (req, res) {//add new ride
    const ride = req.body
    const [locationId] = await sequelize
        .query(`INSERT INTO location VALUES(null, '${ride.location.name}', '${ride.location.longitude}', '${ride.location.latitude}')`)
        console.log(locationId)
    const [destinationId] = await sequelize
        .query(`INSERT INTO location VALUES(null, '${ride.destination.name}', '${ride.destination.longitude}', '${ride.destination.latitude}')`)
    const result = await sequelize
        .query(`INSERT INTO ride VALUES(null, ${locationId}, ${destinationId}, '${ride.departureTime}', ${ride.distance}, ${ride.isDone})`)
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
router.put('/ride/:rideId', async function (req, res) {//finish ride
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
router.get('/analytics/:id/:from/:to', async function (req, res) {
    const id = req.params.id
    const from = req.params.from
    const to = req.params.to
    const driverQuery = `SELECT COUNT(user_id)
                        FROM users_rides
                        INNER JOIN ride ON users_rides.ride_id=ride.id
                        WHERE users_rides.user_id=${id} AND type="driver" AND
                        ride.departure_time>="${from}" AND ride.departure_time<="${to}";`
    const passengerQuery = `SELECT COUNT(user_id)
                            FROM users_rides
                            INNER JOIN ride ON users_rides.ride_id=ride.id
                            WHERE users_rides.user_id=${id} AND type="passenger" AND 
                            ride.departure_time>="${from}" AND ride.departure_time<="${to}";`
    const incomeQuery = `SELECT SUM(distance)
                        FROM users_rides
                        INNER JOIN ride ON users_rides.ride_id=ride.id
                        WHERE users_rides.user_id=${id} AND users_rides.type="driver" AND
                        ride.departure_time>="${from}" AND ride.departure_time<="${to}";`
    const expenseQuery = `SELECT SUM(distance)
                        FROM users_rides
                        INNER JOIN ride ON users_rides.ride_id=ride.id
                        WHERE users_rides.user_id=${id} AND users_rides.type="passenger" AND users_rides.status="approved"
                        AND ride.departure_time>="${from}" AND ride.departure_time<="${to}";`
    const [carpools] = (await sequelize.query(driverQuery))[0]
    const [ridesJoined] = (await sequelize.query(passengerQuery))[0]
    const [income] = (await sequelize.query(incomeQuery))[0]
    const [expense] = (await sequelize.query(expenseQuery))[0]
    const carpoolsCount = carpools["COUNT(user_id)"]
    const ridesJoinedCount = ridesJoined["COUNT(user_id)"]
    const incomeSum = income['SUM(distance)']
    const expenseSum = expense['SUM(distance)']
    res.send({
        carpools: carpoolsCount,
        ridesJoined: ridesJoinedCount,
        income: incomeSum,
        expense: expenseSum
    })
})

module.exports = router