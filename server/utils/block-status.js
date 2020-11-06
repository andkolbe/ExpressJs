function blockStatus(req, res, next) {
    if (req.url === '/status') {
        res.status(401).send('YOU SHALL NOT PASS') // don't use sendStatus and send together
    } else {
        console.log(req.url);
        next();
    }
}

module.exports = {
    blockStatus
}