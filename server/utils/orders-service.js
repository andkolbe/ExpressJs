const path = require('path');
const fs = require('fs'); // these also have to be imported into this page 

function getOrders() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../data/orders.json'), (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(JSON.parse(data));
        });
    })
}

module.exports = {
    getOrders
}