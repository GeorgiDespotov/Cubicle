const express = require('express');
const expressConfig = require('./config/express');
const databeseConfig = require('./config/database');
const routsConfig = require('./config/routs');

const { init: storage } = require('./services/storage');



start();

async function start() {

    const port = 3000;
    const app = express();

    expressConfig(app);
    await databeseConfig(app);
    app.use(await storage());
    routsConfig(app);

    
    

    app.listen(port, () => console.log(`Server listening on port ${port}`));
}