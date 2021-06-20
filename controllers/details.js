module.exports = {
    async details(req, res) {
        const cube = await req.storage.getById(req.params.id);

        if ( cube == undefined) {
            res.redirect('/404')
        } else {
            const ctx = {
                title: 'Details',
                cube
            }
            res.render('details', ctx);
        }
    },
    async attach(req, res) {
        const cube = await req.storage.getById(req.params.id);
        const accesories = await req.storage.getAllAccessory((cube.accessories || []).map(a => a._id));

        res.render('attach', {
            title: 'Attach Stickers',
            cube,
            accesories
        });
    },
    async attachPost(req, res) {
        const cubeId = req.params.cubeId;
        const stickerId = req.body.accessory;

        await req.storage.attachSticker(cubeId, stickerId);

        res.redirect(`/details/${req.params.cubeId}`);
    }
};