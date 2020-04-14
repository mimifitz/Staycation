// var express = require("express");
// const db = require("../model/helper");

var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

//const VERSION = "v1";

router.get('/listings', (req, res) => {
    // Respond by send the full list of data in "listings" table
    db("SELECT * FROM listings ORDER BY id ASC;")
        .then(results => {
            res.send(results.data);
        })
        .catch(err => res.status(500).send(err));
});

router.get('/listings/:id', (req, res) => {
    // Respond by send the full list of data in "listens" table
    db(`SELECT * FROM listings WHERE id=${req.params.id};`)
        .then(results => {
            res.send(results.data);
        })
        .catch(err => res.status(500).send(err));
});

router.post('/listings', (req, res) => {
    db(`INSERT INTO listings (user_id, date_published, space_type, is_shared, location_id, reviews_id) VALUES
   ('${req.body.user_id}', '${req.body.date_published}', '${req.body.space_type}', '${req.body.is_shared}', '${req.body.location_id}', '${req.body.reviews_id}');`)
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
router.put(`/listings/:id`, (req, res) => {
    // The request's body is available in req.body
    // URL params are available in req.params
    db(`UPDATE INTO listings (user_id, date_published, space_type, is_shared, location_id, reviews_id) VALUES ('${req.body.user_id}', '${req.body.date_published}', '${req.body.space_type}', '${req.body.is_shared}', '${req.body.location_id}', ${req.body.reviews_id});`)
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
router.delete(`/listings/:id`, (req, res) => {
    // URL params are available in req.params
    db(`DELETE FROM listings WHERE id=${req.params.id};`)
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







//FUNCTION METHOD
// function getListings(req, res, next) {
//     db(`SELECT * FROM listings ORDER BY id ASC;`)
//         .then((results) => {
//             res.send(results.data);
//         })
//         .catch((err) => res.status(500).send(err));
// }

// function createListing(req, res) {
//     db(`INSERT INTO listings (user_id, date_published, space_type, is_shared, location_id, reviews_id) VALUES
//   ('${req.body.user_id}', '${req.body.date_published}', '${req.body.space_type}', '${req.body.is_shared}', '${req.body.location_id}', ${req.body.reviews_id});`)
//         .then((results) => {
//             getListings(req, res, next);
//         })
//         .catch((err) => res.status(500).send(err));
// }

// function getListingById(req, res) {
//     db(`SELECT * FROM users WHERE id=${req.params.listing_id};`)
//         .then((results) => {
//             getListings(req, res, next);
//         })
//         .catch((err) => res.status(500).send(err));
// }

// function updateListing(req, res) {
//     db(
//         `UPDATE listings SET space_type='${req.body.space_type}', is_shared='${req.body.is_shared}',
//     location_id='${req.body.location_id}' WHERE id=${req.params.user_id}, id=${req.params.listing_id};`
//     )
//         .then((results) => {
//             getUsers(req, res, next);
//         })
//         .catch((err) => res.status(500).send(err));
// }

// function deleteListing(req, res) {
//     db(`DELETE FROM listings WHERE id=${req.params.listing_id};`)
//         .then((results) => {
//             getListings(req, res, next);
//         })
//         .catch((err) => res.status(500).send(err));
// }

// module.exports = {
//     getListings,
//     createListing,
//     getListingById,
//     updateListing,
//     deleteListing,
// };

module.exports = router;