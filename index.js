const express = require('express');
const expressConfig = require('./config/express');
const databeseConfig = require('./config/database');
const routsConfig = require('./config/routs');

const storage = require('./middlewears/storage');
const logger = require('./middlewears/logger');



start();

async function start() {

    const port = 3000;
    const app = express();

    app.use(logger())

    await databeseConfig(app);
    expressConfig(app);

    app.use(await storage());
    routsConfig(app);

    
    

    app.listen(port, () => console.log(`Server listening on port ${port}`));
}