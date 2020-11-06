const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const services = require('./utils/orders-service');
const block = require('./utils/block-status');

const app = express();

app.use(morgan('dev')); // morgan can replace the custom middleware block
app.get('/status', block.blockStatus, (req, res) => res.sendStatus(200)); // no next because it just sends a response
app.use(express.static('public')); // connects front end file structure with back end
app.use(express.urlencoded({ extended: false })); // body parser. extended will always be false


app.get('/', (req, res) => {
    res.send('Hello from the web server side...')
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await services.getOrders();
        res.send(orders);
    } catch (error) {
        res.status(500).send('WHYYYYYY')
        
    }
})

app.post('/formsubmissions', (req, res) => {

    fs.readFile(path.join(__dirname, './data/orders.json'), (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('This code sucks'); // this is a response to the front end letting it know there's an error on the server
            // nothing below a response will run if it is triggered
        }

        const orders = JSON.parse(data);
        orders.push(req.body)

        fs.writeFile(path.join(__dirname, './data/orders.json'), JSON.stringify(orders), err => {
            if (err) {
                console.log(err);
                res.status(500).send('This code sucks'); // this is a response to the front end letting it know there's an error on the server
                // nothing below a response will run if it is triggered
            }
            res.send('Your order has been placed!');
        });
    });


    // console.log(req.body); // req.body represents form data filled out and sent with the request. the form data in the body needs to be parsed to the back end
    // req.url is where it's going. req.body is the info sent along with it
    // req.body is populated with the input names
    // body parser is now built into express. you don't need to install it seperately. put it at the top with the other middleware


}) // POST indicates you are submitting a form somewhere

app.listen(3000, () => console.log('Server is running'));

// everything in the public folder is a static file. It doesn't dynamically change after you write and save it

// (req, res) => {} This callback function runs when any route is hit. You can intercept this with your own custom middleware, 
// put a check on it, and either terminate it early or let it continue down the page
// endpoints like app.get app.host app.delete don't need next because they just send a response
// you only need next if there is a next step to get to


/*
app.use((req, res, next) => { // custom middleware. It is a function that intercepts the (req, res) object. This is built into express
    console.log(req.originalUrl); // this should tell you where any incoming request is going to. It will console log which of your webpages are being accessed, or what requests people are making to the server
    next(); // if you don't add next here, the code gets stuck. You need next to continue down the code
})
*/





