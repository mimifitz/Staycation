var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

//const VERSION = "v1";

router.get('/bookings', (req, res) => {
    // Respond by send the full list of data in "listings" table
    db("SELECT * FROM bookings ORDER BY id ASC;")
        .then(results => {
            res.send(results.data);
        })
        .catch(err => res.status(500).send(err));
});

router.get('/bookings/:id', (req, res) => {
    // Respond by send the full list of data in "listens" table
    db(`SELECT * FROM bookings WHERE id=${req.params.id};`)
        .then(results => {
            res.send(results.data);
        })
        .catch(err => res.status(500).send(err));
});
//"CREATE TABLE bookings ( id INT NOT NULL AUTO_INCREMENT, user_id integer, listing_id integer, start_date date, end_date date, PRIMARY KEY(`id`
router.post('/bookings', (req, res) => {
    db(`INSERT INTO bookings (user_id, listings_id, start_date, end_date) VALUES ('${req.body.user_id}', '${req.body.listing_id}', '${req.body.start_date}', '${req.body.end_date}');`)
        .then((results) => {
            if (results.error)
            {
                res.status("ERROR! ANOTHER TRY PLS").send({
                    error: results.error,
                });
            } else
            {
                res.send({
                    body: results.data,
                });
            }
        })
        .catch((err) => res.status("SORRY,TRY AGAIN").send(err));
});

//UPDATE
router.put(`/bookings/:id`, (req, res) => {
    // The request's body is available in req.body
    // URL params are available in req.params
    db(`INSERT INTO bookings (user_id, listing_id, start_date, end_date) VALUES ('${req.body.user_id}', '${req.body.listing_id}', '${req.body.start_date}', '${req.body.end_date}');`)
        .then(results => {
            if (results.error)
            {
                res.status("ERROR! TRY AGAIN").send({ //OR  //res.status(404).send({
                    error: results.error
                });
            } else
            {
                res.send({
                    body: results.data
                });
            }
        })
        .catch(err => res.status("NAH,TRY AGAIN").send(err));
});

//DELETE
router.delete(`/bookings/:id`, (req, res) => {
    // URL params are available in req.params
    db(`DELETE FROM bookings WHERE id=${req.params.id};`)
        .then(results => {
            if (results.error)
            {
                res.status("ERROR! TRY AGAIN").send({ //OR res.status(404).send({
                    error: results.error
                });
            } else
            {
                res.send({
                    body: results.data
                });
            }
        })
        .catch(err => res.status("NAH,TRY AGAIN").send(err));
});

module.exports = router;