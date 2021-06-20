module.exports = {
    createAccessory(req, res) {
        res.render('createAccessory', { title: 'Create new Accessory'})
    },
    async accesoryPost(req, res) {
        const accessory = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        };

        await req.storage.createAccessory(accessory);

        res.redirect('/');
    }

    
};