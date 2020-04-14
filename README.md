# my-first-mvp README :pushpin:

## staycation

staycation is a global exchange platform where users can swap their home for as little, or as long, as they want.

# App objectives

- Rebuild a database to suit my understanding,correcting errors & creating queries with dummy data(for testing purpose).
- Build an API server.
- Create back end first,TEST all API routes in postman
- Adding map,calender and review video

## Getting started

### Dependencies

Run `yarn` on root folder to install dependencies related to Express.

cd `client` and run yarn install dependencies related to React.

### Database Prep

Create `.env` file in project directory and add

```
DB_HOST=localhost
DB_USER=root
DB_PASS=YOUR-PASSWORD
DB_NAME=staycation
```

Type `mysql -u root -p` to access the MySQL CLI using your password.

In the MySQL CLI, type `create database staycation`; to create a database in MySQL.

Run the following in the MySQL CLI: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD'`;

Run `node model/database.js` in your TERMINAL, in the root folder of your project. This will create 5 tables called 'listings', 'users', 'bookings', 'locations' and 'reviews' in your database.

### Run Your Development Servers

- Run `yarn start` in project directory to start the Express server on port 5000
- `cd` client and run `yarn start` to start client server in development mode with hot reloading in port 3000.
- Client is configured so all API calls will be proxied to port 5000
- You can test your client app in `http://localhost:3000`
- You can test your API in `http://localhost:5000`
  &nbsp;

#### Product Userflows

![Userflow mapping](/design/userflow-design.png "My MVP userflow design")
&nbsp;

#### Database Design

![Database mapping](/design/db-schema.png "My MVP database design")
&nbsp;

#### URL Mapping

| URL                          | HTTP Method | Description            | Request Object                                               | Response Object                                                                                    |
| ---------------------------- | ----------- | ---------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| /listings             | GET         | Get listings           | n/a                                                          | {listings: [date_published: date,space_type: string,is_shared: boolean,location_id: integer]}      |
| /api/v1/listings/:id         | GET         | Get listing by id      | { listing_id:integer }                                       | {user_id: integer,date_published: date,space_type: string,is_shared: boolean,location_id: integer} |
| /listings             | POST        | Add listing            | {space_type: string,is_shared: boolean,location_id: integer} | {listing_id: integer,space_type: string,is_shared: boolean,location_id: integer,user_id: integer}  |
| /listings:id          | PUT         | Edit listing           | {listing_id: integer,user_id: integer }                      | {space_type: string,is_shared: boolean,location_id: integer}                                       |
| /listings:id          | DELETE      | Delete listing         | n/a                                                          | {}                                                                                                 |
| /users/:id/bookings   | GET         | Get bookings by user   | {user_id: integer,}                                          | {booking_id: integer}                                                                              |
| /users/bookings/:id/  | POST        | Add review             | {rating: integer,review_body: string,booking_id: integer}    | {rating: integer,review_body: string,user_id: integer}                                             |
| /listings/:id/reviews | GET         | Get reviews by listing | {listing_id: integer}                                        | {rating: integer,review_body: string}                                                              |

&nbsp;

#### Route File Structuring

![API route files structure](/design/api-routes-file-structure.png "My API routes file structure")
&nbsp;

#### Full Stack Framework

![Full stack design](/design/fs-design.png "My MVP full stack design")

Recreated from and inspired by, Al Madireddy's article:
[Designing A Web App Architecture](https://dev.to/almadireddy/full-stack-101-2-designing-our-web-app-architecture-l6a)

### Future features

- Videos of reviews from user's experience
- Adding calender
- Weather (to determine the weather focast at location before booking)
- Integration with Google Maps API, SendGrid and [Numbeo](https://www.numbeo.com/common/api.jsp).

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
