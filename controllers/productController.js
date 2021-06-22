const router = require('express').Router();

router.get('/', async (req, res) => {
    const cubes = await req.storage.getAll(req.query);
    const ctx = {
        title: 'Cubicle',
        cubes,
        search: req.query.search || '',
        from: req.query.from || '',
        to: req.query.to || ''
    }

    res.render('index', ctx);
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: Number(req.body.difficultyLevel)
    };
    try {
        await req.storage.create(cube)
    } catch (err) {
        if (err.name == 'ValidationError') {
            return res.render('create', { title: 'Create', error: 'Invalid input!' });
        }
    }
    res.redirect('/');
});

router.get('/details/:id', async (req, res) => {
    const cube = await req.storage.getById(req.params.id);

    if (cube == undefined) {
        res.redirect('/404')
    } else {
        const ctx = {
            title: 'Details',
            cube
        }
        res.render('details', ctx);
    }
});

router.get('/edit/:id', async (req, res) => {
    const cube = await req.storage.getById(req.params.id);
    cube[`select${cube.difficultyLevel}`] = true;

    if (cube === undefined) {
        res.redirect('/404')
    } else {
        const ctx = {
            title: 'Edit Cube',
            cube
        }
        res.render('edit', ctx);
    }
});

router.post('/edit/:id', async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: Number(req.body.difficultyLevel)
    };
    console.log(req.params.id);
    try {
        await req.storage.edit(req.params.id, cube);
        res.redirect('/');
    } catch (err) {
        res.redirect('/404');
    }
});

router.get('/attach/:cubeId', async (req, res) => {
    const cube = await req.storage.getById(req.params.cubeId);
    const accesories = await req.storage.getAllAccessory((cube.accessories || []).map(a => a._id));

    res.render('attach', {
        title: 'Attach Stickers',
        cube,
        accesories
    });
});

router.post('/attach/:cubeId', async (req, res) => {
    const cubeId = req.params.cubeId;
    const stickerId = req.body.accessory;

    await req.storage.attachSticker(cubeId, stickerId);

    res.redirect(`/details/${req.params.cubeId}`);
});

module.exports = router;