require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
    host: DB_HOST || "127.0.0.1",
    user: DB_USER || "root",
    password: DB_PASS || "root",
    database: DB_NAME || "staycation",
    multipleStatements: true,
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    let sql =

        // JUST MAKING SURE WE DNN CREATE TWO TABLES WITH SAME NAMES!
        'SET FOREIGN_KEY_CHECKS = 0; ' +

        'DROP TABLE if exists locations; DROP TABLE if exists users; DROP TABLE if exists listings; DROP TABLE if exists bookings; DROP TABLE if exists reviews; ' +
        // Here we actually create the tables in any other.

        //USERS
        "CREATE TABLE users ( id INT NOT NULL AUTO_INCREMENT, email varchar(255) UNIQUE NOT NULL, phone_number integer UNIQUE, num_country_code integer, name varchar(255), preferred_contact_method varchar(255), PRIMARY KEY (`id`)); " +  //CORRECT SYNTAX
        //"CREATE TABLE users ( id integer PRIMARY KEY, email varchar(255) UNIQUE NOT NULL, phone_number integer UNIQUE, num_country_code integer, name varchar(255), preferred_contact_method varchar(255) ); " +

        //LISTINGS
        "CREATE TABLE listings ( id INT NOT NULL AUTO_INCREMENT , user_id integer, date_published date, space_type varchar(255), is_shared boolean, location_id integer, PRIMARY KEY(`id`)); " +
        //"CREATE TABLE listings ( id INT NOT NULL AUTO_INCREMENT , user_id integer, date_published date, space_type varchar(255), is_shared boolean, location_id integer, reviews_id integer, PRIMARY KEY(`id`)); " +

        //LOCATIONS
        "CREATE TABLE locations ( id INT NOT NULL AUTO_INCREMENT, street_name varchar(255), city_name varchar(255), latitude float, longitude float, PRIMARY KEY(`id`) ); " +

        //BOOKINGS
        "CREATE TABLE bookings ( id INT NOT NULL AUTO_INCREMENT, user_id integer, listing_id integer, start_date date, end_date date, PRIMARY KEY(`id`) ); " +

        //REVIEWS
        //This table can't have a reference key and depend on listings.There can't be a review without listing .
        "CREATE TABLE reviews ( id INT NOT NULL AUTO_INCREMENT, booking_id integer, rating INT, review_body text, PRIMARY KEY (`id`)); " +


        //ENFORCING REFERENCE INTERGRATION THROUGH FOREIGN KEYS
        "ALTER TABLE listings ADD FOREIGN KEY (user_id) REFERENCES users (id); " +
        //"ALTER TABLE listings ADD FOREIGN KEY (reviews_id) REFERENCES reviews (id); " + LISTINGS CAN NOT DEPEND REVIEW.
        "ALTER TABLE bookings ADD FOREIGN KEY (user_id) REFERENCES users (id); " +
        "ALTER TABLE bookings ADD FOREIGN KEY (listing_id) REFERENCES listings (id); " +
        "ALTER TABLE reviews ADD FOREIGN KEY (booking_id) REFERENCES bookings (id); " +
        'SET FOREIGN_KEY_CHECKS = 1; '
        ;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(
            "Table creation: `users`, `listings`, `locations`, `bookings` was successful!"
        );

        console.log("Closing...");
    });


    //CREATED IN ORDER OF KEY REFERENCES OR DEPENDENCIES
    //1.DUMMY DATA CREATED(this table must first be created before others due to the fact that it has references from other tables)
    sql =
        "INSERT INTO users (email, phone_number, num_country_code, name, preferred_contact_method) VALUES ('uche34@gmail.com', 800453689, 00234, 'uche', 'email');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dummy data for 'users'(A) table was successful!");
    });

    //DUMMY TABLE FOR locations(b)
    sql =
        "INSERT INTO users (email, phone_number, num_country_code, name, preferred_contact_method) VALUES ('obaayaa@gmail.com', 24567898, 00233, 'Obaayaa', 'email');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dummy data for 'users'(B) table was successful!");
    });

    //2.DUMMY TABLE FOR locations (a)
    sql =
        "INSERT INTO locations (street_name, city_name, latitude, longitude) VALUES ('sant silvestre', 'santa coloma de gramenent', '41.45152', '2.2081');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dummy data for 'locations'(A) table was successful!");
    });

    //DUMMY TABLE FOR locations(b)
    sql =
        "INSERT INTO locations (street_name, city_name, latitude, longitude) VALUES ('Ankaboe street', 'kumasi', '6.6666', '1.6163');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dummy data for 'locations' (B)table was successful!");
    });


    //3.DUMMY TABLE FOR listings(a)
    sql =
        "INSERT INTO listings (user_id, date_published, space_type, is_shared, location_id) VALUES (1, '2020-05-12', 'apartment tjlksjhgfgah jsygts ahfsey huiugqvty garsgqjjfs j8avw love', true, 1);";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dummy data for 'listings' (A)table was successful!");
    });

    //DUMMY TABLE FOR listings (b)
    sql =
        "INSERT INTO listings (user_id, date_published, space_type, is_shared, location_id) VALUES (2, '2020-08-12', 'Countryside farmhouse.A place to take a break from all the chaos in the city', false, 2);";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dummy data for 'listings'(B) table was successful!");
    });


    //4.DUMMY TABLE FOR bookings(a)
    sql =
        "INSERT INTO bookings (user_id, listing_id, start_date, end_date)  VALUES(1, 1, '2020-05-08', '2020-06-08');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dummy data for 'bookings'(A) table was successful!");
    });

    //DUMMY TABLE FOR reviews (b)
    sql =
        "INSERT INTO bookings (user_id, listing_id, start_date, end_date)  VALUES(2, 2, '2020-04-09', '2020-06-20');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dummy data for 'bookings' (B)table was successful!");
    });


    //5.DUMMY TABLE FOR reviews (a)
    sql =
        "INSERT INTO reviews (booking_id, rating, review_body) VALUES (1, '5','the apartment was absolutely clean and has the best views I have ever seen.It was a great vacation experience');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dummy data for 'reviews' (A)table was successful!");
    });

    //DUMMY TABLE FOR reviews(b)
    sql =
        "INSERT INTO reviews (booking_id, rating, review_body) VALUES (2, '4','I give 4 star because there was dog hair allover the sofa.I mean the entire house');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dummy data for 'reviews' (B)table was successful!");
    });


    con.end();
});