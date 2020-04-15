var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

//const VERSION = "v1";

//REQUEST FOR ENTIRE DATA
router.get(`/locations`, (req, res) => {
    // Respond by sending the full list of data in this table
    db("SELECT * FROM locations ORDER BY id ASC;")
        .then(results => {
            res.send(results.data);
        })
        .catch(err => res.status(500).send(err));
});

// REQUEST FOR A SPECIFIC DATE BY ID
router.get(`/locations/:id`, (req, res) => {
    // Respond by send the full list of data in "listens" table
    db(`SELECT * FROM locations WHERE id=${req.params.id};`)
        .then(results => {
            res.send(results.data);
        })
        .catch(err => res.status(500).send(err));
});

//CREATE A DATA
router.post(`/locations`, (req, res) => {
    db(`INSERT INTO locations (booking_id, rating, review_body) VALUES ('${req.body.booking_id}', '${req.body.rating}', '${req.body.review_body}');`)
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
router.put(`/locations/:id`, (req, res) => {
    // The request's body is available in req.body
    // URL params are available in req.params
    db(`INSERT INTO locations (booking_id, rating, review_body) VALUES ('${req.body.booking_id}', '${req.body.rating}', '${req.body.review_body}');`)
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
router.delete(`/locations/:id`, (req, res) => {
    // URL params are available in req.params
    db(`DELETE FROM locations WHERE id = ${req.params.id};`)
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