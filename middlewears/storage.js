const productSevice = require('../services/product');
const accesoryService = require('../services/accesory');

async function init() {

    return (req, res, next) => {
        const storage = Object.assign({}, productSevice, accesoryService);
        req.storage = storage;

        next();
    };
}

module.exports = init;
