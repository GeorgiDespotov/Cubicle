const { post: commentPost } = require('../controllers/comments');

const productController = require('../controllers/productController');
const accessoryContrller = require('../controllers/accessoryController');
const homeContrller = require('../controllers/homeController');
const aouthController = require('../controllers/aouthController');

module.exports = (app) => {

    app.use('/products', productController);
    app.use('/accessory', accessoryContrller);
    app.use('/auth', aouthController);

    app.post('/comments/:cubeId/create', commentPost);

    app.use('/', homeContrller)
};