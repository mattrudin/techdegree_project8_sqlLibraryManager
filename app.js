/************************************************************************************
Require functions
************************************************************************************/
const express = require('express');
const app = express();
const routes = require('./routes');
const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

/************************************************************************************
Configuration
set and use functions
************************************************************************************/
//Uses the public and images folder for static files
app.use('/static', express.static('public'));
//BodyParser setup (for parsing req.body)
app.use(bodyParser.urlencoded({ extended:false }));
//MethodOverride setup (for adding the put method on the form submission)
app.use(methodOverride('_method'));

//Sets the view engine to pug
app.set('view engine', 'pug');

/************************************************************************************
Implementing routes (located in ./routes)
************************************************************************************/
app.use(routes);


/************************************************************************************
Error handling
************************************************************************************/
//If route does not exist, generate a 404 error
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    console.log(`${err}: ${err.status}`);
    next(err);
});

//Handle errors with pug template
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status)
    res.render('page-not-found');
})


/************************************************************************************
Server and database startup
************************************************************************************/
sequelize.sync().then(() => {
    const server = app.listen(3000, () => {
        console.log(`The application is running on localhost:${server.address().port}`)
    });
});